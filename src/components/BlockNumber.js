import React, { useEffect, useState } from "react";
import { Icon } from "semantic-ui-react";

import { useSubstrateState } from "../substrate-lib";

function Main(props) {
  const { api } = useSubstrateState();
  const { finalized } = props;
  const [blockNumber, setBlockNumber] = useState(0);
  const [blockNumberTimer, setBlockNumberTimer] = useState(0);

  const bestNumber = finalized ? api.derive.chain.bestNumberFinalized : api.derive.chain.bestNumber;

  useEffect(() => {
    let unsubscribeAll = null;

    bestNumber((number) => {
      // Append `.toLocaleString('en-US')` to display a nice thousand-separated digit.
      setBlockNumber(number.toNumber().toLocaleString("en-US"));
      setBlockNumberTimer(0);
    })
      .then((unsub) => {
        unsubscribeAll = unsub;
      })
      .catch(console.error);

    return () => unsubscribeAll && unsubscribeAll();
  }, [bestNumber]);

  const timer = () => {
    setBlockNumberTimer((time) => time + 1);
  };

  useEffect(() => {
    const id = setInterval(timer, 1000);
    return () => clearInterval(id);
  }, []);

  return (
    <div className={`${finalized ? "bg-[#F6F0D8]" : "bg-[#D6EDDA]"} py-8 px-8 rounded-3xl`}>
      <h1 className="mb-[32px] text-center text-5xl">{blockNumber}</h1>
      <div className="mb-[34px] text-lg text-center text-2xl">{(finalized ? "Finalized" : "Current") + " Block"}</div>
      <div className="clock-block text-right text-3xl font-bold">
        <Icon name="time" /> {blockNumberTimer}
      </div>
    </div>
  );
}

export default function BlockNumber(props) {
  const { api } = useSubstrateState();
  return api.derive && api.derive.chain && api.derive.chain.bestNumber && api.derive.chain.bestNumberFinalized ? (
    <Main {...props} />
  ) : null;
}
