import React, { useEffect, useState } from "react";
import { CopyToClipboard } from "react-copy-to-clipboard";
import { Button, Label, Table } from "semantic-ui-react";
import { useSubstrateState } from "../substrate-lib";
import { capitalize } from "../utils";

export default function Main(props) {
  const { api, keyring } = useSubstrateState();
  const accounts = keyring.getPairs();
  const [balances, setBalances] = useState({});

  useEffect(() => {
    const addresses = keyring.getPairs().map((account) => account.address);
    let unsubscribeAll = null;

    api.query.system.account
      .multi(addresses, (balances) => {
        const balancesMap = addresses.reduce(
          (acc, address, index) => ({
            ...acc,
            [address]: balances[index].data.free.toHuman(),
          }),
          {}
        );
        setBalances(balancesMap);
      })
      .then((unsub) => {
        unsubscribeAll = unsub;
      })
      .catch(console.error);

    return () => unsubscribeAll && unsubscribeAll();
  }, [api, keyring, setBalances]);

  return (
    <div>
      <h1 className="text-2xl">Balances</h1>
      {accounts.length === 0 ? (
        <Label basic color="yellow">
          No accounts to be shown
        </Label>
      ) : (
        <Table celled striped size="large" className="!rounded-3xl !text-xl">
          <Table.Body>
            <Table.Row>
              <Table.Cell width={3}>
                <strong>Name</strong>
              </Table.Cell>
              <Table.Cell width={10}>
                <strong>Address</strong>
              </Table.Cell>
              <Table.Cell width={3}>
                <strong>Balance</strong>
              </Table.Cell>
            </Table.Row>
            {accounts.map((account) => (
              <Table.Row key={account.address}>
                <Table.Cell width={3}>{capitalize(account.meta.name)}</Table.Cell>
                <Table.Cell
                  width={8}
                  className="!w-full relative !p-6 hover:border-x-4 hover:border-[#ffdd50] flex items-center"
                >
                  <div className="">{account.address}</div>
                  <CopyToClipboard
                    className="ml-4 absolute right-4 hover:scale-105 active:scale-90 duration-300 w-[40px] h-[40px] font-semibold"
                    text={account.address}
                  >
                    <Button basic circular compact size="medium" color="yellow" icon="copy" />
                  </CopyToClipboard>
                </Table.Cell>
                <Table.Cell width={3}>{balances && balances[account.address] && balances[account.address]}</Table.Cell>
              </Table.Row>
            ))}
          </Table.Body>
        </Table>
      )}
    </div>
  );
}
