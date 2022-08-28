import React, { createRef } from "react";
import "semantic-ui-css/semantic.min.css";
import { Container, Grid, Sticky } from "semantic-ui-react";

import { DeveloperConsole } from "../../../substrate-lib/components";

import AccountSelector from "../../../components/AccountSelector";
import BlockNumber from "../../../components/BlockNumber";
import { ContactInfo } from "../../../components/ContactInfo";
import Metadata from "../../../components/Metadata";
import Balances from "../../../components/Balances";
import NodeInfo from "../../../components/NodeInfo";
import Transfer from "../../../components/Transfer";
import Events from "../../../components/Events";
import Loader from "./Loader";
import Message from "./Message";
import { useSubstrateState } from "../../../substrate-lib";

const contextRef = createRef();

const Main = () => {
  const { apiState, apiError, keyringState } = useSubstrateState();

  if (apiState === "ERROR") return <Message errObj={apiError} />;
  else if (apiState !== "READY") return <Loader text={"Connecting to Substrate"} />;

  if (keyringState !== "READY") {
    return <Loader text={"Loading accounts (please review any extension's authorization)"} />;
  }

  return (
    <div ref={contextRef}>
      <Sticky context={contextRef}>
        <AccountSelector />
      </Sticky>
      <Container>
        <Grid stackable columns="equal">
          <Grid.Row stretched>
            <NodeInfo />
            <Metadata />
            <BlockNumber />
            <BlockNumber finalized />
          </Grid.Row>
          <Grid.Row stretched>
            <Balances />
          </Grid.Row>
          <Grid.Row>
            <Transfer />
            <Events />
          </Grid.Row>
        </Grid>
      </Container>
      <ContactInfo />
      <DeveloperConsole />
    </div>
  );
};

export default Main;
