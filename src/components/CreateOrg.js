import React, { useState } from "react";
import { Form } from "semantic-ui-react";
import { TxButton } from "../substrate-lib/components";

export default function CreateOrg(props) {
  const [status, setStatus] = useState(null);
  const [formState, setFormState] = useState({ orgName: null });
  const { accountPair } = props;

  const onChange = (_, data) => setFormState((prev) => ({ ...prev, [data.state]: data.value }));

  const { orgName } = formState;
  return (
    <div className="bg-[#F6F0D8] p-12 rounded-3xl h-full">
      <h1 className="font-bold ">New Organization</h1>
      <div className="create-org-form mt-12">
        <Form>
          <Form.Input required label="Name" type="text" state="orgName" onChange={onChange} className="form-input" />
          <Form.Field>
            <TxButton
              accountPair={accountPair}
              label="Submit"
              type="SIGNED-TX"
              setStatus={setStatus}
              style={{ display: "block", margin: "auto" }}
              attrs={{
                palletRpc: "registrar",
                callable: "createOrganization",
                inputParams: [orgName],
                paramFields: [true],
              }}
            />
          </Form.Field>
          <div className="text-xl font-medium ">{status}</div>
        </Form>
      </div>
    </div>
  );
}
