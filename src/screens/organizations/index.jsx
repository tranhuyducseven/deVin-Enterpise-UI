import React from "react";
import Dashboard from "./components/Dashboard";
import { DefaultLayout } from "../../layouts/DefaultLayout";
import { SubstrateContextProvider } from "../../substrate-lib";
const OrganizationScreen = ({props}) => {
  return (
    <SubstrateContextProvider>
      <DefaultLayout>
        <Dashboard {...props} />
      </DefaultLayout>
    </SubstrateContextProvider>
  );
};

export default OrganizationScreen;
