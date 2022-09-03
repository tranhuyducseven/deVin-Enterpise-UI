import React, { useState } from "react";

import Events from "./Events";
import OrganizationSelector from "./OrganizationSelector";
import ProductList from "./ProductList";
import RegisterProductForm from "./RegisterProductForm";

export default function Main(props) {
  const { accountPair } = props;
  const [selectedOrganization, setSelectedOrganization] = useState("");

  return (
    <div className="products relative">
      <div>
        <OrganizationSelector accountPair={accountPair} setSelectedOrganization={setSelectedOrganization} />
      </div>
      <div className="grid grid-cols-2 gap-12 h-full mt-6">
        <div className="grow">
          <RegisterProductForm accountPair={accountPair} organization={selectedOrganization} />
        </div>
        <div className="grow">
          <Events maxHeight={"100%"} isProduct/>
        </div>
      </div>

      <div className="products-list mt-4 bg-white">
        <h1 className="text-2xl">Product Listing</h1>
        <ProductList accountPair={accountPair} organization={selectedOrganization} />
      </div>
    </div>
  );
}
