import React, { createRef } from "react";
import "semantic-ui-css/semantic.min.css";
import { useSubstrateState } from "../substrate-lib";
import BlockNumber from "./BlockNumber";
import Metadata from "./Metadata";
import NodeInfo from "./NodeInfo";

const contextRef = createRef();

const Overview = () => {
  const { apiState, apiError, keyringState } = useSubstrateState();

  if (apiState === "ERROR") return <Message errObj={apiError} />;
  else if (apiState !== "READY") return <Loader text={"Connecting to Substrate"} />;

  if (keyringState !== "READY") {
    return <Loader text={"Loading accounts (please review any extension's authorization)"} />;
  }

  return (
    <div ref={contextRef} className="overview">
      <div className="dashboard-name font-bold text-4xl relative -top-[35px]">Overview</div>
      <div className="heading grid grid-cols-5 gap-x-4">
        <div className="col-start-1 font-bold text-3xl pb-4">Portfolio</div>
        <div className="col-start-3 font-bold text-3xl pb-4">Detail</div>
      </div>
      <div className="grid grid-cols-5 gap-4">
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
