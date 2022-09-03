import React from "react";

import CreateRole from "./CreateRole";
import AssignRevokeRole from "./AssignRevokeRole";
import AddSuperAdmin from "./AddSuperAdmin";
import Events from "./Events";

export default function Main(props) {
  const { accountPair } = props;
  return (
    <div className="grid grid-cols-2 gap-12 h-full">
      <div className="gap-8 flex flex-col">
        <div>
          <CreateRole accountPair={accountPair} />
        </div>
        <div className="grow">
          <AddSuperAdmin accountPair={accountPair} />
        </div>
      </div>
      <div className="h-full gap-8 flex flex-col">
        <div>
          <AssignRevokeRole accountPair={accountPair} />
        </div>
        <div className='grow'>
          <Events />
        </div>
      </div>
    </div>
  );
}
