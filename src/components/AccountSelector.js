import React, { useEffect, useState } from "react";
import { CopyToClipboard } from "react-copy-to-clipboard";
import { Link } from "react-router-dom";

import { Button, Container, Dropdown, Icon, Image, Label, Menu } from "semantic-ui-react";

import { useSubstrate, useSubstrateState } from "../substrate-lib";

const CHROME_EXT_URL =
  "https://chrome.google.com/webstore/detail/polkadot%7Bjs%7D-extension/mopnmbcafieddcagagdcbnhejhlodfdd";
const FIREFOX_ADDON_URL = "https://addons.mozilla.org/en-US/firefox/addon/polkadot-js-extension/";

const acctAddr = (acct) => (acct ? acct.address : "");

function Main(props) {
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

  // Set the initial address
  useEffect(() => {
    // `setCurrentAccount()` is called only when currentAccount is null (uninitialized)
    !currentAccount && initialAddress.length > 0 && setCurrentAccount(keyring.getPair(initialAddress));
  }, [currentAccount, setCurrentAccount, keyring, initialAddress]);

  const onChange = (addr) => {
    setCurrentAccount(keyring.getPair(addr));
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
        options={keyringOptions}
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
  return keyring.getPairs && api.query ? <Main {...props} /> : null;
}
