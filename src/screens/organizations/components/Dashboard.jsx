import React, { createRef, useState } from "react";
import "semantic-ui-css/semantic.min.css";
import { Container, Image, ItemImage, Sticky, Tab } from "semantic-ui-react";
import { AccountSelector, Members, Organizations, Products, Shipments, Tracking } from "../../../components";
import { useSubstrateState } from "../../../substrate-lib";
import Loader from "../../components/Loader";
import Message from "../../components/Message";

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
    { menuItem: <div className="text-white">icon</div>, render: () => <div className="text-white">Hello org</div> },
    { menuItem: "Members", render: () => <Members accountPair={accountPair} /> },
    { menuItem: "Products", render: () => <Products accountPair={accountPair} /> },
    { menuItem: "Shipments", render: () => <Shipments accountPair={accountPair} /> },
    { menuItem: "Tracking", render: () => <Tracking accountPair={accountPair} /> },
  ];

  const contextRef = createRef();

  return (
    <div ref={contextRef} className="dashboard p-4">
      <div className="flex">
        <div className="logo w-20 h-20 ">
          <Image src={`${process.env.PUBLIC_URL}/assets/deVin-yellow.png`} className="m-0" />
        </div>
        <div className="account text-white grow bg-white rounded-t-[3.5rem] ml-6 flex justify-end items-center pr-12">
          <AccountSelector />
        </div>
      </div>
      <div>
        <Tab menu={{ fluid: true, vertical: true, tabular: true }} panes={panes} />
      </div>
    </div>
  );
};

export default Dashboard;
