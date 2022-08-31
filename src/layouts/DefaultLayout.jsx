import React from "react";

export const DefaultLayout = ({ children }) => {
  return (
    <div className="organization h-screen py-32 px-28 bg-center bg-contain bg-[url('/assets/bg-app.jpg')] opacity-90">
      <div className="h-full bg-black rounded-[3.5rem]">{children}</div>
    </div>
  );
};
