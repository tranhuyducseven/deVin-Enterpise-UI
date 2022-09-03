import { stringToHex } from "@polkadot/util";
import React, { useState } from "react";
import { Form } from "semantic-ui-react";

import { TxButton } from "../substrate-lib/components";

export default function RegisterProductForm(props) {
  const { accountPair, organization } = props;
  const [status, setStatus] = useState([]);
  const [params, setParams] = useState({ id: null, props: null });

  const onChange = (_, data) => {
    const newParams = { ...params };
    if (data.state === "id") {
      newParams.id = data.value.length === 0 ? null : stringToHex(data.value);
    } else if (data.state === "desc") {
      newParams.props = data.value.length === 0 ? null : [["0x64657363", stringToHex(data.value)]];
    }
    setParams(newParams);
  };

  return (
    <div className="bg-[#93d9f8] p-8 rounded-3xl h-full">
      <h1 className="font-bold text-2xl">Register a Product</h1>
      <div className="create-product-form mt-4">
        <Form>
          <Form.Input
            fluid
            required
            label="Product ID"
            name="productId"
            state="id"
            onChange={onChange}
            className="form-input"
          />
          <Form.Input
            fluid
            required
            label="Description"
            name="productDesc"
            state="desc"
            onChange={onChange}
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
                palletRpc: "products",
                callable: "registerProduct",
                inputParams: [params.id, organization, params.props],
                paramFields: [true, true, true],
              }}
            />
          </Form.Field>
          <div className="text-xl font-medium ">{status}</div>
        </Form>
      </div>
    </div>
  );
}
