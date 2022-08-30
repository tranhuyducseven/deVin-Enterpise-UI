import React, { createRef } from "react";
import "semantic-ui-css/semantic.min.css";
import { Container, Grid, Sticky } from "semantic-ui-react";
import AccountSelector from "./AccountSelector";
import BlockNumber from "./BlockNumber";
import Metadata from "./Metadata";
import NodeInfo from "./NodeInfo";
import Balances from "./Balances";
import { useSubstrateState } from "../substrate-lib";

const contextRef = createRef();

const Overview = () => {
  const { apiState, apiError, keyringState } = useSubstrateState();

  if (apiState === "ERROR") return <Message errObj={apiError} />;
  else if (apiState !== "READY") return <Loader text={"Connecting to Substrate"} />;

  if (keyringState !== "READY") {
    return <Loader text={"Loading accounts (please review any extension's authorization)"} />;
  }

  return (
    <div ref={contextRef}>
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

export default Overview;
