import React, { useEffect, useState } from "react";
import { Card, Icon, Grid } from "semantic-ui-react";

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
    <div className="bg-[#E5F2FE] p-6 rounded-xl">
      <div>
        <h1 className="m-0">{nodeInfo.nodeName}</h1>
        <div className="text-sm mb-4">{nodeInfo.chain} </div>
        <div className="mb-4 text-blue">{socket}</div>
      </div>
      <div extra>
        <Icon name="setting" />v{nodeInfo.nodeVersion}
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
