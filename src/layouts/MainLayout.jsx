import React from "react";
import { ContactInfo } from "../components/ContactInfo";
import { DeveloperConsole } from "../substrate-lib/components";

export const MainLayout = ({ children }) => {
  return (
    <div className="main-layout">
      <div className="main">{children}</div>
      <div className="footer">
        <ContactInfo />
        <DeveloperConsole />
      </div>
    </div>
  );
};
