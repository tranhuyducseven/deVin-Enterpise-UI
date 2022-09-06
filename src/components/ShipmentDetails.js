import { hexToString, u8aToString } from "@polkadot/util";
import React, { useEffect, useState } from "react";
import { Icon, Step } from "semantic-ui-react";
import { useSubstrateState } from "../substrate-lib";

import ShipmentOperations from "./ShipmentOperations";

function ShipmentDetailsComponent(props) {
  const { api } = useSubstrateState();
  const [shipment, setShipment] = useState(null);
  const [eventIndices, setEventIndices] = useState([]);
  const [events, setEvents] = useState([]);
  const [products, setProducts] = useState([]);
  const { accountPair, shipmentId } = props;

  useEffect(() => {
    let unsubscribe;

    async function shipment(shipmentId) {
      await api.query.tracking.shipments(shipmentId, async (data) => {
        if (!data || !data.value || !data.value.owner) {
          return;
        }

        const nonce = await api.query.palletDid.attributeNonce([data.value.owner, "Org"]);
        const attrHash = api.registry.createType("(AccountId, Text, u64)", [
          data.value.owner,
          "Org",
          nonce.subn(1),
        ]).hash;
        const orgAttr = await api.query.palletDid.attributeOf([data.value.owner, attrHash]);
        setShipment({ ...data.value, owner: u8aToString(orgAttr.value) });
      });
    }

    if (shipmentId) {
      shipment(shipmentId);
    } else {
      setShipment(null);
      return () => unsubscribe && unsubscribe();
    }
  }, [api.query.palletDid, api.query.tracking, api.registry, shipmentId]);

  useEffect(() => {
    let unsubscribe;

    async function eventsOfShipment(shipmentId) {
      await api.query.tracking.eventsOfShipment(shipmentId, (data) =>
        setEventIndices(data ? data.map((x) => x.toNumber()) : [])
      );
    }

    if (shipmentId) {
      eventsOfShipment(shipmentId);
    } else {
      setEventIndices([]);
      return () => unsubscribe && unsubscribe();
    }
  }, [api.query.tracking, shipmentId]);

  useEffect(() => {
    let unsubscribe;

    async function allEvents(eventIndices) {
      const futures = eventIndices.map((idx) => api.query.tracking.allEvents(idx));
      Promise.all(futures)
        .then((data) => {
          if (data) {
            const sorted = data.map((x) => x.value).sort((a, b) => a.timestamp.toNumber() - b.timestamp.toNumber());
            setEvents(sorted);
          } else {
            setEvents([]);
          }
        })
        .catch((e) => console.log(e));
    }

    if (eventIndices) {
      allEvents(eventIndices);
    } else {
      setEvents([]);
      return () => unsubscribe && unsubscribe();
    }
  }, [api.query.tracking, eventIndices]);

  useEffect(() => {
    let unsubscribe;

    async function products(shipment) {
      const futures = shipment.products.map((productId) => api.query.products.products(productId.toString()));
      Promise.all(futures)
        .then((data) => {
          if (data) {
            const products = data.map((p) => {
              const product = p.value;
              let descProp = { name: "", value: "" };
              if (product.props) {
                descProp = product.props.value.find((prop) => hexToString(prop.name.toString()) === "desc");
              }
              return {
                id: product.id && hexToString(product.id.toString()),
                desc: hexToString(descProp.value.toString()),
              };
            });

            setProducts(products);
          } else {
            setProducts([]);
          }
        })
        .catch((e) => console.log(e));
    }

    if (shipment && shipment.products) {
      products(shipment);
    } else {
      setProducts([]);
      return () => unsubscribe && unsubscribe();
    }
  }, [api.query.products, shipment]);

  return (
    !!shipment && (
      <div className="bg-white rounded-3xl h-full">
        <div className="shipment-details p-4 mt-4 border-[1px] border-black rounded-lg grid grid-cols-3">
          <div className="shipment-info">
            <div className="info-content text-lg flex flex-col justify-between">
              <h1 className="font-bold text-2xl">
                Shipment: <span className="text-red-700">{shipmentId}</span>
              </h1>
              <div className="py-4">
                <span className="font-bold">Owner: </span>
                <span>{shipment.owner.toString()}</span>
              </div>
              <div className="py-4">
                <span className="font-bold">Status: </span>
                <span>{shipment.status.toString()}</span>
              </div>
              <div className="py-4">
                <span className="font-bold">Registered: </span>
                <span>{new Date(shipment.registered.toNumber()).toLocaleString()}</span>
              </div>
              <div className="py-4">
                <span className="font-bold">Delivered: </span>
                <span>
                  {shipment.delivered.value.toString().length > 0
                    ? new Date(shipment.delivered.value.toNumber()).toLocaleString()
                    : ""}
                </span>
              </div>
            </div>
          </div>

          <div className="shipment-products">
            <h1 className="font-bold text-2xl">Products</h1>
            <div>
              {products ? (
                <div>
                  {products.map(
                    (product, idx) =>
                      product.desc != "" && (
                        <div key={idx} className="mt-5 text-lg">
                          <span className="py-3 pr-8 pl-1 border-b border-r border-gray-200 ">
                            id: <span className="text-red-700">{product.id}</span>
                          </span>
                          <span className="py-3 px-8 border-b border-gray-200 ">
                            <span className="text-red-700">{product.desc}</span>
                          </span>
                        </div>
                      )
                  )}{" "}
                </div>
              ) : (
                <div>No product found</div>
              )}
            </div>
          </div>
          <div className="shipment-events">
            <h1 className="font-bold text-2xl">Events</h1>
            <div >
              {events ? (
                <Step.Group vertical size="small" className="!grid !grid-cols-2 gap-2">
                  {" "}
                  {events.map((event, idx) => {
                    const eventType = event.event_type.toString();
                    return (
                      <Step key={idx}>
                        <Icon
                          name={
                            eventType === "ShipmentRegistration"
                              ? "calendar outline"
                              : eventType === "ShipmentPickup"
                              ? "bookmark outline"
                              : eventType === "ShipmentScan"
                              ? "qrcode"
                              : "home"
                          }
                          className="!outline-none"
                        />
                        <Step.Content>
                          <Step.Title>{event.event_type.toString().substring(8)}</Step.Title>
                          <Step.Description>{new Date(event.timestamp.toNumber()).toLocaleString()}</Step.Description>
                        </Step.Content>
                      </Step>
                    );
                  })}{" "}
                </Step.Group>
              ) : (
                <div>No event found</div>
              )}
            </div>
          </div>
        </div>
        <div className="shipment-operations p-4 mt-4 border-[1px] border-black rounded-lg relative">
          <h1 className="font-bold text-2xl">Shipping Operations</h1>
          <ShipmentOperations accountPair={accountPair} shipment={shipment} />
        </div>
      </div>
    )
  );
}

export default function ShipmentDetails(props) {
  const { api } = useSubstrateState();
  return api ? <ShipmentDetailsComponent {...props} /> : null;
}
