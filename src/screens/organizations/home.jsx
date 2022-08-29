import React from "react";
import { MainLayout } from "../../layouts/MainLayout";
import { SubstrateContextProvider } from "../../substrate-lib";

import Main from "./Main.component";

const HomeScreen = () => {
  return (
    <SubstrateContextProvider>
      <MainLayout>
        <Main />
      </MainLayout>
    </SubstrateContextProvider>
  );
};

export default HomeScreen;
