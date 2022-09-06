import { hexToString } from "@polkadot/util";
import React, { useEffect, useState } from "react";
import { List, Message } from "semantic-ui-react";
import { useSubstrateState } from "../substrate-lib";

export default function Main(props) {
  const { api } = useSubstrateState();
  const { organization, setSelectedShipment } = props;
  const [shipments, setShipments] = useState([]);
  const [selected, setSelected] = useState("");

  useEffect(() => {
    let unsub = null;

    async function shipments(organization) {
      unsub = await api.query.tracking.shipmentsOfOrganization(organization, (data) => {
        setShipments(data);
        setSelectedShipment("");
        setSelected("");
      });
    }

    if (organization) {
      shipments(organization);
    } else {
      setShipments([]);
      setSelectedShipment("");
      setSelected("");
    }

    return () => unsub && unsub();
  }, [organization, api.query.tracking, setSelectedShipment]);

  const handleSelectionClick = (ev, { data }) => {
    const shipment = hexToString(shipments[data].toString());
    setSelectedShipment(shipment);
    setSelected(shipment);
  };

  if (!shipments || shipments.length === 0) {
    return (
      <Message warning>
        <Message.Header>No shipment registered for your organisation.</Message.Header>
      </Message>
    );
  }

  return (
    <div className="bg-white p-4 rounded-3xl h-full border-2 border-black">
      <h1 className="font-bold text-2xl">List of Shipments</h1>
      <div className="create-product-form mt-4">
        {shipments ? (
          <List selection>
            {shipments.map((shipment, idx) => {
              const shipmentId = hexToString(shipment.toString());
              return (
                <List.Item
                  key={idx}
                  active={selected === shipmentId}
                  header={shipmentId}
                  onClick={handleSelectionClick}
                  data={idx}
                />
              );
            })}
          </List>
        ) : (
          <div>No shipment found</div>
        )}
      </div>
    </div>
  );
}
