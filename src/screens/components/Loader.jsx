import React from "react";
import { Dimmer, Loader, } from "semantic-ui-react";

const LoaderCustomization = ({text}) => (
  <Dimmer active>
    <Loader size="small">{text}</Loader>
  </Dimmer>
);

export default LoaderCustomization;
