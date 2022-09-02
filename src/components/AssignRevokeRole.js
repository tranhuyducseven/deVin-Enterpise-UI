import { hexToString } from "@polkadot/util";
import React, { useEffect, useState } from "react";
import { Card, Form } from "semantic-ui-react";

import { useSubstrateState } from "../substrate-lib";
import { TxButton } from "../substrate-lib/components";

export default function Main(props) {
  const { api } = useSubstrateState();
  const { accountPair } = props;
  const [status, setStatus] = useState(null);
  const [roles, setRoles] = useState([]);
  const [formState, setFormState] = useState({
    assignRevoke: null,
    address: null,
    pallet: null,
    permission: null,
  });
  useEffect(() => {
    let unsub = null;
    const getRoles = async () => {
      unsub = await api.query.rbac.roles((rawRoles) => {
        const roles = rawRoles.map((r) => r.toJSON()).map((r) => ({ ...r, pallet: hexToString(r.pallet) }));
        setRoles(roles);
      });
    };

    if (accountPair) getRoles();
    return () => unsub && unsub();
  }, [accountPair, api, setRoles]);

  const onChange = (_, data) => {
    const { state, value } = data;
    setFormState((formState) =>
      state === "role"
        ? { ...formState, pallet: value.split(":")[0], permission: value.split(":")[1] }
        : { ...formState, [state]: value }
    );
  };

  const dropdownAssignRevoke = [
    { text: "Assign", value: "assign" },
    { text: "Revoke", value: "revoke" },
  ];

  const dropdownRoles = roles
    .map((r) => ({ text: `${r.pallet} : ${r.permission}`, value: `${r.pallet}:${r.permission}` }))
    .sort((a, b) => a.text.localeCompare(b.text));

  const { assignRevoke, address, pallet, permission } = formState;

  let rsRole = null;
  if (pallet && permission) {
    rsRole = api.createType("Role", {
      pallet: pallet,
      permission: api.createType("Permission", permission),
    });
  }

  return (
    <div className="bg-[#E5DEF0] p-8 rounded-3xl h-full">
      <h1 className="font-bold ">Assign / Revoke Role</h1>
      <div className="create-role-form mt-12">
        <Form>
          <Form.Dropdown
            fluid
            required
            label="Assign or Revoke?"
            selection
            state="assignRevoke"
            options={dropdownAssignRevoke}
            onChange={onChange}
            className="form-input"
          />
          <Form.Input
            className="form-input"
            fluid
            required
            label="To"
            type="text"
            placeholder="Address"
            state="address"
            onChange={onChange}
          />
          <Form.Dropdown
            fluid
            required
            label={`${assignRevoke === "revoke" ? "Revoke" : "Assign"} Role`}
            selection
            state="role"
            options={dropdownRoles}
            onChange={onChange}
            className="form-input"

          />
          <Form.Field>
            <TxButton
              accountPair={accountPair}
              label={`${assignRevoke === "revoke" ? "Revoke" : "Assign"}`}
              setStatus={setStatus}
              style={{ display: "block", margin: "auto" }}
              type="SIGNED-TX"
              attrs={{
                palletRpc: "rbac",
                callable: `${assignRevoke === "revoke" ? "revokeAccess" : "assignRole"}`,
                inputParams: [address, rsRole],
                paramFields: [true, true],
              }}
            />
          </Form.Field>
          <div className="text-xl font-medium ">{status}</div>
        </Form>
      </div>
    </div>
  );
}
