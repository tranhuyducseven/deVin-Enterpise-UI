import React from "react";
import { SubstrateContextProvider } from "../../substrate-lib";

import Main from "./components/Main";

const HomeScreen = () => {
  return (
    <SubstrateContextProvider>
      <Main />
    </SubstrateContextProvider>
  );
};

export default HomeScreen;
