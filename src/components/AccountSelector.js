import React, { useEffect } from "react";
import { CopyToClipboard } from "react-copy-to-clipboard";

import { Button, Dropdown } from "semantic-ui-react";

import { useSubstrate, useSubstrateState } from "../substrate-lib";

const acctAddr = (acct) => (acct ? acct.address : "");

function Main(props) {
  const { setCurrentAccountAddress } = props;

  const {
    setCurrentAccount,
    state: { keyring, currentAccount },
  } = useSubstrate();

  // Get the list of accounts we possess the private key for
  const keyringOptions = keyring.getPairs().map((account) => ({
    key: account.address,
    value: account.address,
    text: account.meta.name.toUpperCase(),
    icon: "user",
  }));

  const initialAddress = keyringOptions.length > 0 ? keyringOptions[0].value : "";
  setCurrentAccountAddress(initialAddress);

  // Set the initial address
  useEffect(() => {
    // `setCurrentAccount()` is called only when currentAccount is null (uninitialized)
    !currentAccount && initialAddress.length > 0 && setCurrentAccount(keyring.getPair(initialAddress));
  }, [currentAccount, setCurrentAccount, keyring, initialAddress]);

  const onChange = (addr) => {
    setCurrentAccount(keyring.getPair(addr));
    setCurrentAccountAddress(addr);
  };
  return (
    <div className="account-selector">
      <CopyToClipboard className="" text={acctAddr(currentAccount)}>
        <Button basic circular size="large" icon="user" color={currentAccount ? "yellow" : "red"} />
      </CopyToClipboard>
      <Dropdown
        className="!bg-[#ececec] !border-none"
        search
        selection
        placeholder="Select an account"
        options={keyringOptions.filter((item, index) => {
          if (index !== 3) return item;
        })}
        onChange={(_, dropdown) => {
          onChange(dropdown.value);
        }}
        value={acctAddr(currentAccount)}
      />
    </div>
  );
}

export default function AccountSelector(props) {
  const { api, keyring } = useSubstrateState();
  return keyring.getPairs() && api.query ? <Main {...props} /> : null;
}
