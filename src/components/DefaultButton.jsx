import React from "react";

const DefaultButton = ({ text }) => (
  <div className="!bg-slate-50 p-[1.25rem] mt-[31px] rounded-lg text-lg font-semibold text-center hover:!bg-black hover:text-white hover:cursor-pointer hover:scale-105  duration-300 ">
    {text}
  </div>
);

export default DefaultButton;
