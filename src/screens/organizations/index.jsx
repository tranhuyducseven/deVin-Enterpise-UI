import React from "react";
import { DefaultLayout } from "../../layouts/DefaultLayout";
import { SubstrateContextProvider } from "../../substrate-lib";
import AnimationBox from "../components/AnimationBox";
import Dashboard from "./components/Dashboard";
const OrganizationScreen = ({ props }) => {
  return (
    <SubstrateContextProvider>
      <DefaultLayout>
        <Dashboard {...props} />
        <AnimationBox isOrg />
      </DefaultLayout>
    </SubstrateContextProvider>
  );
};

export default OrganizationScreen;
