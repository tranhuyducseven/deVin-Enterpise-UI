import React from "react";
import { Image } from "semantic-ui-react";

const IconDashboard = ({ name }) => {
  return (
    <span className="icon-dashboard flex justify-center items-center">
      <Image className="" src={`/assets/icons/${name}.png`} />;
    </span>
  );
};

export default IconDashboard;
