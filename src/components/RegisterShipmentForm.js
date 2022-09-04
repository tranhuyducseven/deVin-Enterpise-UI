import React, { useEffect, useState } from "react";
import { Form, Message } from "semantic-ui-react";

import { hexToString, u8aToString } from "@polkadot/util";
import { useSubstrateState } from "../substrate-lib";
import { TxButton } from "../substrate-lib/components";

function RegisterShipmentFormComponent(props) {
  const { api } = useSubstrateState();
  const { accountPair, organization } = props;
  const [status, setStatus] = useState(null);
  const [paramFields, setParamFields] = useState([]);
  const [products, setProducts] = useState([]);
  const [state, setState] = useState({
    shipmentId: "",
    owner: organization,
    productId1: "",
    productId2: "",
  });

  const updateParamFields = () => {
    if (!api.tx.tracking) {
      return;
    }
    const paramFields = api.tx.tracking.registerShipment.meta.args.map((arg) => ({
      name: arg.name.toString(),
      type: arg.type.toString(),
    }));
    setParamFields(paramFields);
  };

  useEffect(updateParamFields, [api]);

  useEffect(() => {
    let unsub = null;

    async function productsOfOrg(organization) {
      unsub = await api.query.products.productsOfOrganization(organization, (data) => setProducts(data));
    }

    if (organization) productsOfOrg(organization);
    return () => unsub && unsub();
  }, [api.query.products, organization]);

  // For updating the Owner field
  useEffect(() => {
    async function setOwner() {
      if (!organization) {
        return;
      }

      const nonce = await api.query.palletDid.attributeNonce([organization, "Org"]);

      const attrHash = api.registry.createType("(AccountId, Text, u64)", [organization, "Org", nonce.subn(1)]).hash;
      const orgAttr = await api.query.palletDid.attributeOf([organization, attrHash]);
      setState((state) => ({ ...state, owner: u8aToString(orgAttr.value) }));
      

    }

    setOwner();
  }, [api.query.palletDid, api.registry, organization]);

  const handleChange = (_, data) => setState({ ...state, [data.state]: data.value });
  useEffect(() => {
    if (status && status.split(":")[0].includes("Finalized")) setTimeout(() => setStatus(null), 5000);
  }, [status]);
  console.log("organization: " + state.owner);

  return (
    <div className="bg-[#abcf7d] p-8 rounded-3xl h-full">
      <h1 className="font-bold text-2xl">Register a Shipment</h1>
      <div className="create-shipment-form mt-4">
        <Form>
          <Form.Input
            name="shipmentId"
            label="Shipment ID"
            state="shipmentId"
            required
            value={state.shipmentId}
            onChange={handleChange}
            className="form-input"
          />
          <Form.Input name="owner" label="Owner" state="owner" value={state.owner} required onChange={handleChange} />
          <Form.Dropdown
            placeholder="Select a product"
            fluid
            label="Product 1"
            clearable
            search
            selection
            state="productId1"
            options={products.map((p) => {
              const productId = hexToString(p.toString());
              return { value: productId, text: productId };
            })}
            value={state.productId1}
            onChange={handleChange}
            className="form-input"
          />
          <Form.Dropdown
            placeholder="Select a product"
            fluid
            label="Product 2"
            clearable
            search
            selection
            state="productId2"
            options={products.map((p) => {
              const productId = hexToString(p.toString());
              return { value: productId, text: productId };
            })}
            value={state.productId2}
            onChange={handleChange}
            className="form-input"
          />
          <Form.Field>
            <TxButton
              accountPair={accountPair}
              label="Register"
              type="SIGNED-TX"
              style={{ display: "block", margin: "auto" }}
              setStatus={setStatus}
              attrs={{
                palletRpc: "tracking",
                callable: "registerShipment",
                inputParams: [
                  state.shipmentId,
                  state.owner,
                  [state.productId1 || "", state.productId2 || ""].join(","),
                ],
                paramFields: paramFields,
              }}
              className="form-input"
            />
          </Form.Field>
        </Form>
      </div>
      {!!status && (
        <Message info>
          <Message.Header className="!text-2xl">{status.split(":")[0]}</Message.Header>
          <p className="!text-xl">{status.split(":")[1]}</p>
        </Message>
      )}
    </div>
  );
}

export default function RegisterShipmentForm(props) {
  const { api } = useSubstrateState();
  return api.tx ? <RegisterShipmentFormComponent {...props} /> : null;
}
