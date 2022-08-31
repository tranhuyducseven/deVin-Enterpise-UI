import React, { useEffect, useState } from "react";
import { Icon, Modal } from "semantic-ui-react";

import { useSubstrateState } from "../substrate-lib";

function Main(props) {
  const { api } = useSubstrateState();
  const [metadata, setMetadata] = useState({ data: null, version: null });

  useEffect(() => {
    const getMetadata = async () => {
      try {
        const data = await api.rpc.state.getMetadata();
        setMetadata({ data, version: data.version });
      } catch (e) {
        console.error(e);
      }
    };
    getMetadata();
  }, [api.rpc.state]);

  return (
    <div className="bg-[#E5DEF0] py-8 px-8 rounded-3xl">
      <h1 className="mb-4">Metadata</h1>
      <div className="text-lg mb-4">
        <Icon name="setting" />
        <span className="font-semibold"> Version: </span>v{metadata.version}
      </div>
      <Modal
        trigger={
          <div className="!bg-slate-50 p-[1.25rem] mt-[31px] rounded-lg text-lg font-semibold text-center hover:!bg-black hover:text-white hover:cursor-pointer hover:scale-105  duration-300 ">
            Show Metadata
          </div>
        }
      >
        <Modal.Header className="!text-5xl !bg-amber-50">Runtime Metadata</Modal.Header>
        <Modal.Content scrolling className="!bg-amber-50">
          <Modal.Description>
            <pre>
              <code className="!text-2xl">{JSON.stringify(metadata.data, null, 2)}</code>
            </pre>
          </Modal.Description>
        </Modal.Content>
      </Modal>
    </div>
  );
}

export default function Metadata(props) {
  const { api } = useSubstrateState();
  return api.rpc && api.rpc.state && api.rpc.state.getMetadata ? <Main {...props} /> : null;
}
