import React, { useState } from "react";

import Events from "./Events";
import OrganizationSelector from "./OrganizationSelector";
import ShipmentDetails from "./ShipmentDetails";
import ShipmentSelection from "./ShipmentSelection";

export default function Main(props) {
  const { accountPair } = props;
  const [selectedOrganization, setSelectedOrganization] = useState("");
  const [selectedShipment, setSelectedShipment] = useState("");

  return (
    <div className="products relative h-full">
      <div>
        <OrganizationSelector accountPair={accountPair} setSelectedOrganization={setSelectedOrganization} />
      </div>
      <div className="grid grid-cols-2 gap-12 mt-6">
        <div className="grow">
          <ShipmentSelection
            accountPair={accountPair}
            organization={selectedOrganization}
            setSelectedShipment={setSelectedShipment}
          />
        </div>
        <div className="grow">
          <Events />
        </div>
      </div>

      <div className="shipments-details mt-4 bg-white">
        {selectedShipment ? (
          <div className="mt-4">
            <ShipmentDetails accountPair={accountPair} shipmentId={selectedShipment} />
          </div>
        ) : null}
      </div>
    </div>
  );
}
