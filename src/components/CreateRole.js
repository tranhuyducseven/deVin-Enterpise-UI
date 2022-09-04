import React, { useEffect, useState } from "react";
import { Card, Form, Message } from "semantic-ui-react";

import { useSubstrateState } from "../substrate-lib";
import { TxButton } from "../substrate-lib/components";

function Main(props) {
  const { api } = useSubstrateState();
  const { accountPair } = props;
  const [status, setStatus] = useState(null);
  const [palletRPCs, setPalletRPCs] = useState([]);
  const [permission, setPermission] = useState(0);

  const initFormState = {
    palletRpc: "",
  };

  const [formState, setFormState] = useState(initFormState);
  const { palletRpc } = formState;

  const permissionOptions = [
    {
      key: "Execute",
      text: "Execute",
      value: "Execute",
    },
    {
      key: "Manage",
      text: "Manage",
      value: "Manage",
    },
  ];

  const capitalizeFirstLetter = (string) => {
    return string.charAt(0).toUpperCase() + string.slice(1);
  };

  const updatePalletRPCs = () => {
    if (!api) {
      return;
    }
    const palletRPCs = Object.keys(api.tx)
      .sort()
      .filter((pr) => Object.keys(api.tx[pr]).length > 0)
      .map((pr) => ({ key: pr, value: pr, text: pr }));
    setPalletRPCs(palletRPCs);
  };

  useEffect(updatePalletRPCs, [api]);

  const onPalletCallableParamChange = (_, data) => {
    setFormState((formState) => {
      let res;
      const { state, value } = data;
      if (state === "palletRpc") {
        res = { ...formState, [state]: value };
      }
      return res;
    });
  };
  useEffect(() => {
    if (status && status.split(":")[0].includes("Finalized")) setTimeout(() => setStatus(null), 5000);
  }, [status]);

  return (
    <div className="bg-[#E5F2FE] p-8 rounded-3xl h-full">
      <h1 className="font-bold ">Create Role</h1>
      <div className="create-role-form mt-12">
        <Form>
          <Form.Dropdown
            fluid
            required
            label="Pallet"
            onChange={onPalletCallableParamChange}
            search
            selection
            state="palletRpc"
            value={palletRpc}
            options={palletRPCs}
            className="form-input"
          />
          <Form.Dropdown
            fluid
            required
            label="Permission"
            selection
            options={permissionOptions}
            onChange={(_, { value }) => setPermission(value)}
            className="form-input"
          />
          <Form.Field>
            <TxButton
              accountPair={accountPair}
              label="Create"
              setStatus={setStatus}
              style={{ display: "block", margin: "auto" }}
              type="SIGNED-TX"
              attrs={{
                palletRpc: "rbac",
                callable: "createRole",
                inputParams: [capitalizeFirstLetter(palletRpc), permission],
                paramFields: [true, true],
              }}
            />
          </Form.Field>
          <div className="!fixed !top-6 !left-6">
        {!!status && (
          <Message info>
            <Message.Header className="!text-2xl">{status.split(":")[0]}</Message.Header>
            <p className="!text-xl">{status.split(":")[1]}</p>
          </Message>
        )}
      </div>
        </Form>
      </div>
    </div>
  );
}

export default function CreateRole(props) {
  const { api } = useSubstrateState();
  return api.tx ? <Main {...props} /> : null;
}
