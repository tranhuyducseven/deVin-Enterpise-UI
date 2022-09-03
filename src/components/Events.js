import React, { useEffect, useState } from "react";
import { Feed, Button, Card } from "semantic-ui-react";

import { useSubstrateState } from "../substrate-lib";

// Events to be filtered from feed
const FILTERED_EVENTS = [
  'system:ExtrinsicSuccess:: (phase={"ApplyExtrinsic":0})',
  'system:ExtrinsicSuccess:: (phase={"ApplyExtrinsic":1})',
];

function Main(props) {
  const isProduct = props.isProduct;
  const maxHeight = props.maxHeight || 200;
  const { api } = useSubstrateState();
  const [eventFeed, setEventFeed] = useState([]);

  useEffect(() => {
    let unsub = null;
    const allEvents = async () => {
      unsub = await api.query.system.events((events) => {
        // loop through the Vec<EventRecord>
        events.forEach((record) => {
          // extract the phase, event and the event types
          const { event, phase } = record;
          const types = event.typeDef;

          // show what we are busy with
          const eventName = `${event.section}:${event.method}:: (phase=${phase.toString()})`;

          if (FILTERED_EVENTS.includes(eventName)) return;

          // loop through each of the parameters, displaying the type and data
          const params = event.data.map((data, index) => `${types[index].type}: ${data.toString()}`);

          setEventFeed((e) => [
            {
              icon: "bell",
              summary: `${eventName}-${e.length}`,
              extraText: event.meta.documentation.join(", ").toString(),
              content: params.join(", "),
            },
            ...e,
          ]);
        });
      });
    };

    allEvents();
    return () => unsub && unsub();
  }, [api.query.system]);

  return (
    <div className="events bg-black w-full p-8 rounded-3xl font-bold h-full overflow-hidden">
      <div className="header relative">
        <h1 className={`text-white ${isProduct ? "text-2xl" : ""}`}>Events</h1>
        <Button
          basic
          circular
          size="medium"
          color="grey"
          floated="right"
          icon="erase"
          onClick={(_) => setEventFeed([])}
          className="absolute top-0 right-5 events-button"
        />
      </div>

      <div className="content mt-4" style={{ maxHeight }}>
        <Feed
          className="events-feed text-white text-2xl "
          style={{ clear: "both", overflow: "auto", maxHeight }}
          events={eventFeed}
        />
      </div>
    </div>
  );
}

export default function Events(props) {
  const { api } = useSubstrateState();
  return api.query && api.query.system && api.query.system.events ? <Main {...props} /> : null;
}
