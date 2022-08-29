import React from "react";
import { MainLayout } from "../../layouts/MainLayout";
import { SubstrateContextProvider } from "../../substrate-lib";
import Dashboard from "./Dashboard.component";

export default function OrganizationsScreen(props) {
  return (
    <SubstrateContextProvider>
      <MainLayout>
        <Dashboard {...props} />
      </MainLayout>
    </SubstrateContextProvider>
  );
}
