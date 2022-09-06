import React, { useState } from "react";

import Events from "./Events";
import OrganizationSelector from "./OrganizationSelector";
import RegisterShipmentForm from "./RegisterShipmentForm";
import ShipmentList from "./ShipmentList";

export default function Main(props) {
  const { accountPair } = props;
  const [selectedOrganization, setSelectedOrganization] = useState("");

  return (
    <div className="products relative h-full">
      <div>
        <OrganizationSelector accountPair={accountPair} setSelectedOrganization={setSelectedOrganization} />
      </div>
      <div className="grid grid-cols-2 gap-12 mt-6">
        <div className="grow">
          <RegisterShipmentForm accountPair={accountPair} organization={selectedOrganization} />
        </div>
        <div className="grow">
          <Events maxHeight={"350px"} small />
        </div>
      </div>

      <div className="shipments-list mt-4 bg-white">
        <h1 className="text-2xl">Shipment Listing</h1>
        <ShipmentList accountPair={accountPair} organization={selectedOrganization} />
      </div>
    </div>
  );
}
