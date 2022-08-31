import React, { useEffect, useState } from "react";
import { Icon } from "semantic-ui-react";

import { useSubstrateState } from "../substrate-lib";

function Main(props) {
  const { api, socket } = useSubstrateState();
  const [nodeInfo, setNodeInfo] = useState({});

  useEffect(() => {
    const getInfo = async () => {
      try {
        const [chain, nodeName, nodeVersion] = await Promise.all([
          api.rpc.system.chain(),
          api.rpc.system.name(),
          api.rpc.system.version(),
        ]);
        setNodeInfo({ chain, nodeName, nodeVersion });
      } catch (e) {
        console.error(e);
      }
    };
    getInfo();
  }, [api.rpc.system]);
  return (
    <div className="bg-[#E5F2FE] py-8 px-8 rounded-3xl">
      <div>
        <h1 className="mb-4">{nodeInfo.nodeName}</h1>
        <div className="text-lg mb-4">
          <Icon name="chain" />
          <span className="font-semibold"> Chain: </span>
          {nodeInfo.chain}
        </div>
        <div className="text-lg mb-4 text-blue">
          <Icon name="rocket" />
          <span className="font-semibold"> Socket: </span>
          {socket}
        </div>
      </div>
      <div className="text-lg mb-4">
        <Icon name="setting" />
        <span className="font-semibold"> Version: </span>v{nodeInfo.nodeVersion}
      </div>
    </div>
  );
}

export default function NodeInfo(props) {
  const { api } = useSubstrateState();
  return api.rpc && api.rpc.system && api.rpc.system.chain && api.rpc.system.name && api.rpc.system.version ? (
    <Main {...props} />
  ) : null;
}
