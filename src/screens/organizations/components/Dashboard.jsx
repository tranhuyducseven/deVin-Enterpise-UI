import React, { createRef, useState } from "react";
import "semantic-ui-css/semantic.min.css";
import { Image } from "semantic-ui-react";
import { AccountSelector, Members, Products, Shipments, Tracking } from "../../../components";
import Overview from "../../../components/Overview";
import { useSubstrateState } from "../../../substrate-lib";
import Loader from "../../components/Loader";
import Message from "../../components/Message";
import IconDashboard from "./IconDashboard";
import TabsDashboard from "./TabsDashboard";

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
    {
      name: "Overview",
      menuItem: <IconDashboard name="home" />,
      render: <Overview />,
    },
    { name: "Members", menuItem: "member", render: <Members accountPair={accountPair} /> },
    {
      name: "Organizations",
      menuItem: <div className="text-white">Product</div>,
      render: () => <Products accountPair={accountPair} />,
    },
    { name: "Organizations", menuItem: <IconDashboard />, render: <Shipments accountPair={accountPair} /> },
    { name: "Organizations", menuItem: <IconDashboard />, render: <Tracking accountPair={accountPair} /> },
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
      <div className="">
        <TabsDashboard panes={panes} />
      </div>
    </div>
  );
};

export default Dashboard;
