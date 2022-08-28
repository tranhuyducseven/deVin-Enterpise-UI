import React from "react";

import { Link } from "react-router-dom";
import { Button, Image } from "semantic-ui-react";

const CreateButton = () => {
  return (
    <div className="connect-organizations">
      <Link to="/organizations" target="_blank">
        <Button className="px-0 rounded-lg hover:scale-105 active:scale-90 duration-300 !bg-[#ffdd50]">
          <span className="flex flex-row items-center justify-center px-4 py-1 border border-zinc-400 rounded-lg">
            <span style={{ letterSpacing: "6px" }} className="font-thin text-black pr-2">
              CONNECT ORGANIZATION
            </span>
            <div className="relative w-8 h-8">
              <Image alt="wallet" src={`${process.env.PUBLIC_URL}/assets/org.png`} layout="fill" />
            </div>
          </span>
        </Button>
      </Link>
    </div>
  );
};
export default CreateButton;
