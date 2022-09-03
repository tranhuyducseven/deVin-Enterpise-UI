import { u8aToString } from "@polkadot/util";
import React, { useEffect, useState } from "react";
import { Icon, Message, Pagination, Table } from "semantic-ui-react";

import { useSubstrateState } from "../substrate-lib";
const NUMBER_OF_RENDERED_ITEMS = 4;

export default function Main(props) {
  const { organization } = props;
  const { api } = useSubstrateState();
  const [products, setProducts] = useState([]);
  const [activePage, setActivePage] = useState(1);

  useEffect(() => {
    let unsub = null;

    const getProducts = async () => {
      unsub = await api.query.productRegistry.productsOfOrganization(organization, (productIds) => {
        api.query.productRegistry.products.multi(productIds, (products) => {
          const validProducts = products.filter((product) => !product.isNone).map((product) => product.unwrap());
          setProducts(validProducts);
        });
      });
    };

    if (organization) {
      getProducts();
    }

    return () => unsub && unsub();
  }, [organization, api, setProducts]);

  if (!products || products.length === 0) {
    return (
      <Message warning>
        <Message.Header>No products existed for your organisation.</Message.Header>
        <p>Please create one using the above form.</p>
      </Message>
    );
  }

  const handlePaginationChange = (_, data) => {
    setActivePage(data.activePage);   
  };

  return (
    <div>
      <Table celled striped size="large" className="!rounded-3xl !text-xl overflow-hidden">
        <Table.Header>
          <Table.Row>
            <Table.HeaderCell className="text-lg">ID</Table.HeaderCell>
            <Table.HeaderCell className="text-lg">Organization</Table.HeaderCell>
            <Table.HeaderCell className="text-lg">Description</Table.HeaderCell>
          </Table.Row>
        </Table.Header>

        <Table.Body>
          {products.slice((activePage - 1) * NUMBER_OF_RENDERED_ITEMS, activePage * NUMBER_OF_RENDERED_ITEMS).map((product) => {
            const id = u8aToString(product.id);
            const props = product.props.unwrap();
            return (
              <Table.Row key={id}>
                <Table.Cell className="!p-4 hover:border-[#ffdd50]">{id}</Table.Cell>
                <Table.Cell className="!p-4 hover:border-[#ffdd50]">{product.owner.toString()}</Table.Cell>
                <Table.Cell className="!p-4 hover:border-[#ffdd50]">{u8aToString(props[0].value)}</Table.Cell>
              </Table.Row>
            );
          })}
        </Table.Body>
      </Table>
      <div className="flex justify-end absolute bottom-[0px] right-0">
        <Pagination
          ellipsisItem={false}
          firstItem={false}
          lastItem={false}
          prevItem={{ content: <Icon name="angle left" />, icon: true }}
          nextItem={{ content: <Icon name="angle right" />, icon: true }}
          defaultActivePage={activePage}
          totalPages={Math.ceil(products.length / NUMBER_OF_RENDERED_ITEMS)}
          onPageChange={handlePaginationChange}
        />
      </div>
    </div>
  );
}
