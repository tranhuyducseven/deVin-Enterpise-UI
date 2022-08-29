import React, { createRef, useState } from "react";
import "semantic-ui-css/semantic.min.css";
import { Container, Loader, Message, Sticky, Tab } from "semantic-ui-react";

import { AccountSelector, Members, Organizations, Products, Shipments, Tracking } from "../../components";
import { useSubstrateState } from "../../substrate-lib";

const Dashboard = (props) => {
  const [accountAddress, setAccountAddress] = useState(null);
  const { apiState, keyring, keyringState, apiError } = useSubstrateState();
  const accountPair = accountAddress && keyringState === "READY" && keyring.getPair(accountAddress);

  if (apiState === "ERROR") return <Message err={apiError} />;
  else if (apiState !== "READY") return <Loader text={"Connecting to Substrate"} />;

  if (keyringState !== "READY") {
    return <Loader text={"Loading accounts (please review any extension's authorization)"} />;
  }

  const panes = [
    { menuItem: "Organizations", render: () => <Organizations accountPair={accountPair} /> },
    { menuItem: "Members", render: () => <Members accountPair={accountPair} /> },
    { menuItem: "Products", render: () => <Products accountPair={accountPair} /> },
    { menuItem: "Shipments", render: () => <Shipments accountPair={accountPair} /> },
    { menuItem: "Tracking", render: () => <Tracking accountPair={accountPair} /> },
  ];

  const contextRef = createRef();

  return (
    <div ref={contextRef}>
      <Sticky context={contextRef}>
        <AccountSelector setAccountAddress={setAccountAddress} />
      </Sticky>

      <Container>
        <Tab menu={{ fluid: true, vertical: true, tabular: true }} panes={panes} />
      </Container>
    </div>
  );
};

export default Dashboard;
