import { hexToString, u8aToString } from "@polkadot/util";
import React, { useEffect, useState } from "react";
import { Icon, List, Step } from "semantic-ui-react";
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
      <div className="bg-white p-4 rounded-3xl h-full">
        <div className="shipment-details">
          <h1 className="font-bold text-2xl">
            Shipment: <span className="text-red-800">{shipmentId}</span>
          </h1>
          <div className="info grid grid-cols-2 p-4 border-[1px] border-black rounded-lg">
            <div className="01">
              <div>
                <span className="font-bold">Owner: </span>
                <span>{shipment.owner.toString()}</span>
              </div>
              <div>
                <span className="font-bold">Status: </span>
                <span>{shipment.status.toString()}</span>
              </div>
            </div>
            <div className="02">
              <div>
                <span className="font-bold">Registered: </span>
                <span>{new Date(shipment.registered.toNumber()).toLocaleString()}</span>
              </div>
              <div>
                <span className="font-bold">Delivered: </span>
                <span>
                  {shipment.delivered.value.toString().length > 0
                    ? new Date(shipment.delivered.value.toNumber()).toLocaleString()
                    : ""}
                </span>
              </div>
            </div>
          </div>
          <div className="events grid grid-cols-3 mt-4 border-[1px] border-black rounded-lg">
            <div className="01">
              <h1 className="font-bold text-2xl">Shipping Events</h1>
              <div className="event">
                {events ? (
                  <div vertical size="small">
                    {events.map((event, idx) => {
                      const eventType = event.event_type.toString();
                      return (
                        <Step key={idx}>
                          <Icon
                            name={
                              eventType === "ShipmentRegistration"
                                ? "tasks"
                                : eventType === "ShipmentPickup"
                                ? "truck"
                                : eventType === "ShipmentScan"
                                ? "barcode"
                                : "home"
                            }
                          />
                          <Step.Content>
                            <Step.Title>{event.event_type.toString().substring(8)}</Step.Title>
                            <Step.Description>{new Date(event.timestamp.toNumber()).toLocaleString()}</Step.Description>
                          </Step.Content>
                        </Step>
                      );
                    })}{" "}
                  </div>
                ) : (
                  <div>No event found</div>
                )}
              </div>
            </div>
            <div className="02">
              <h1 className="font-bold text-2xl">Products</h1>
              <div>
                {products ? (
                  <List>
                    {" "}
                    {products.map((product, idx) => (
                      <List.Item key={idx} header={product.id} description={product.desc} />
                    ))}{" "}
                  </List>
                ) : (
                  <div>No product found</div>
                )}
              </div>
            </div>
            <div className="03">
              <h1 className="font-bold text-2xl">Shipping Operations</h1>
              <ShipmentOperations accountPair={accountPair} shipment={shipment} />
            </div>
          </div>
        </div>
      </div>
    )
  );
}

export default function ShipmentDetails(props) {
  const { api } = useSubstrateState();
  return api ? <ShipmentDetailsComponent {...props} /> : null;
}
