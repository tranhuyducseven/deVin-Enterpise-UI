import { u8aToString } from "@polkadot/util";
import React, { useEffect, useState } from "react";
import { Message, Pagination, Table } from "semantic-ui-react";

import { useSubstrateState } from "../substrate-lib";
const NUMBER_OF_RENDERED_ITEMS = 4;

export default function Main(props) {
  const { organization } = props;
  const { api } = useSubstrateState();
  const [shipments, setShipments] = useState([]);
  const [activePage, setActivePage] = useState(1);

  useEffect(() => {
    let unsub = null;

    async function shipments(organization) {
      // console.log("api :", api);
      unsub = await api.query.tracking.shipmentsOfOrganization(organization, (shipmentIds) => {
        api.query.tracking.shipments.multi(shipmentIds, (shipments) => {
          const validShipments = shipments.filter((shipment) => !shipment.isNone).map((shipment) => shipment.unwrap());
          setShipments(validShipments);
        });
      });
    }

    if (organization) {
      shipments(organization);
    } else {
      setShipments([]);
    }

    return () => unsub && unsub();
  }, [organization, api.query.tracking]);

  if (!shipments || shipments.length === 0) {
    return (
      <Message warning>
        <Message.Header>No shipment registered for your organisation.</Message.Header>
        <p>Please create one using the above form.</p>
      </Message>
    );
  }
  const handlePaginationChange = (_, data) => {
    setActivePage(data.activePage);
  };
  const totalPages = Math.ceil(products.length / NUMBER_OF_RENDERED_ITEMS);

  return (
    <div>
      <Table celled striped size="large" className="!rounded-3xl !text-xl overflow-hidden">
        <Table.Header>
          <Table.Row>
            <Table.HeaderCell>ID</Table.HeaderCell>
            <Table.HeaderCell>Owner</Table.HeaderCell>
            <Table.HeaderCell>Status</Table.HeaderCell>
            <Table.HeaderCell>Products</Table.HeaderCell>
          </Table.Row>
        </Table.Header>

        <Table.Body>
          {shipments
            .slice((activePage - 1) * NUMBER_OF_RENDERED_ITEMS, activePage * NUMBER_OF_RENDERED_ITEMS)
            .map((shipment) => {
              const id = u8aToString(shipment.id);
              const products = shipment.products.map((p) => u8aToString(p));
              return (
                <Table.Row key={id}>
                  <Table.Cell className="!p-4 hover:border-[#ffdd50]">{id}</Table.Cell>
                  <Table.Cell className="!p-4 hover:border-[#ffdd50]">{shipment.owner.toString()}</Table.Cell>
                  <Table.Cell className="!p-4 hover:border-[#ffdd50]">{shipment.status.toString()}</Table.Cell>
                  <Table.Cell className="!p-4 hover:border-[#ffdd50]">
                    {products.map((p) => {
                      return <div key={`${id}-${p}`}>{p}</div>;
                    })}
                  </Table.Cell>
                </Table.Row>
              );
            })}
        </Table.Body>
      </Table>
      <div className="flex justify-end absolute bottom-[0px] right-0">
        {totalPages > 1 ? (
          <Pagination
            ellipsisItem={false}
            firstItem={false}
            lastItem={false}
            prevItem={{ content: <Icon name="angle left" />, icon: true }}
            nextItem={{ content: <Icon name="angle right" />, icon: true }}
            defaultActivePage={activePage}
            totalPages={totalPages}
            onPageChange={handlePaginationChange}
          />
        ) : null}
      </div>
    </div>
  );
}
