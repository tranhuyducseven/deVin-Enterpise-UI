import React from "react";
import { Image } from "semantic-ui-react";
import { capitalize } from "../../../utils";

const IconDashboard = ({ name }) => {
  return (
    <div
      className="icon-dashboard w-full flex items-center justify-center hover:scale-150 duration-300 z-50"
      data-tooltip={capitalize(name)}
      data-position="right center"
    >
      <span className="icon-dashboard flex justify-center items-center w-[32px]">
        <Image className="w-full h-full opacity-90 " src={`/assets/icons/${name}.svg`} />
      </span>
    </div>
  );
};

export default IconDashboard;
