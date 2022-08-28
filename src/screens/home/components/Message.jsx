import React from "react";

const Message = (errObj) => (
  <Grid centered columns={2} padded>
    <Grid.Column>
      <Message
        negative
        compact
        floating
        header="Error Connecting to Substrate"
        content={`Connection to websocket '${errObj.target.url}' failed.`}
      />
    </Grid.Column>
  </Grid>
);

export default Message;
