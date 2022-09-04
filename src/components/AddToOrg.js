import React, { useEffect, useState } from "react";
import { Form, Message} from "semantic-ui-react";
import { TxButton } from "../substrate-lib/components";

export default function Main(props) {
  const [status, setStatus] = useState(null);
  const [formState, setFormState] = useState({ addressTo: null });
  const { accountPair } = props;

  const onChange = (_, data) => setFormState((prev) => ({ ...prev, [data.state]: data.value }));

  const { addressTo } = formState;
  useEffect(() => {
    if (status && status.split(":")[0].includes("Finalized")) setTimeout(() => setStatus(null), 5000);
  }, [status]);

  return (
    <div className="bg-[#D6EDDA] p-8 rounded-3xl h-full">
      <h1 className="font-bold ">Add to Organization</h1>
      <div className="add-to-org-form mt-12">
        <Form>
          <Form.Input
            fluid
            required
            label="Who"
            type="text"
            placeholder="Address"
            state="addressTo"
            onChange={onChange}
            className="form-input"
          />
          <Form.Field>
            <TxButton
              accountPair={accountPair}
              label="Submit"
              type="SIGNED-TX"
              setStatus={setStatus}
              style={{ display: "block", margin: "auto" }}
              attrs={{
                palletRpc: "organizations",
                callable: "addToOrganization",
                inputParams: [addressTo],
                paramFields: [true],
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
