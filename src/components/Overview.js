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
      <div className="heading">
        <span>Portfolio</span>
      </div>
      <div className="grid grid-cols-5 gap-3">
        <div className="col-span-2">
          <NodeInfo />
        </div>
        <div className="">
          <Metadata />
        </div>
        <div className="">
          <BlockNumber />
        </div>
        <div className="">
          <BlockNumber finalized />
        </div>
      </div>
    </div>
  );
};

export default Overview;

//<Balances />
