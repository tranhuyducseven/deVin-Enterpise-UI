import React from "react";
import "semantic-ui-css/semantic.min.css";


import AddToOrg from "./AddToOrg";
import CreateOrg from "./CreateOrg";
import Events from "./Events";

export default function Main(props) {
  const { accountPair } = props;
  return (
    <div className="grid grid-cols-2 gap-12 h-full">
      <div className="flex flex-col h-full gap-y-12">
        <div className="h-1/2">
          <CreateOrg accountPair={accountPair} />
        </div>
        <div className="h-1/2">
          <AddToOrg accountPair={accountPair} />
        </div>
      </div>
      <div className="flex">
        <Events maxHeight={"100%"} />
      </div>
    </div>
  );
}
