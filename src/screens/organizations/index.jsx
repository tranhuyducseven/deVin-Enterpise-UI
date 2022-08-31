import React from "react";
import Dashboard from "./components/Dashboard";
import { DefaultLayout } from "../../layouts/DefaultLayout";
import { SubstrateContextProvider } from "../../substrate-lib";
import AnimationBox from "../components/AnimationBox";
const OrganizationScreen = ({props}) => {
  return (
    <SubstrateContextProvider>
      <DefaultLayout>
        <Dashboard {...props} />
        <AnimationBox />
      </DefaultLayout>
    </SubstrateContextProvider>
  );
};

export default OrganizationScreen;
