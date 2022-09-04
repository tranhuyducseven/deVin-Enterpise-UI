import { stringToHex } from "@polkadot/util";
import React, { useEffect, useState } from "react";
import { Form, Message } from "semantic-ui-react";

import { TxButton } from "../substrate-lib/components";

export default function RegisterProductForm(props) {
  const { accountPair, organization } = props;
  const [status, setStatus] = useState(null);
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
  useEffect(() => {
    if (status && status.split(":")[0].includes("Finalized")) setTimeout(() => setStatus(null), 5000);
  }, [status]);

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
          
        </Form>
      </div>
      <div className="!fixed !top-6 !left-6">
        {!!status && (
          <Message info>
            <Message.Header className="!text-2xl">{status.split(":")[0]}</Message.Header>
            <p className="!text-xl">{status.split(":")[1]}</p>
          </Message>
        )}
      </div>
    </div>
  );
}
