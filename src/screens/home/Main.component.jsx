import React, { createRef } from "react";
import "semantic-ui-css/semantic.min.css";
import { Container, Grid, Sticky } from "semantic-ui-react";
import { AccountSelector } from "../../components";

import Balances from "../../components/Balances";
import BlockNumber from "../../components/BlockNumber";
import Metadata from "../../components/Metadata";
import NodeInfo from "../../components/NodeInfo";
import { useSubstrateState } from "../../substrate-lib";
import Loader from "../components/Loader";
import Message from "../components/Message";

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
        </Grid>
      </Container>
    </div>
  );
};

export default Main;
