import React from "react";

const AnimationBox = ({ isOrg }) => {
  return (
    <div className="animation-box">
      <ul className={`${isOrg ? "-z-10" : ""} items`}>
        {Array(10)
          .fill("")
          .map((_, idx) => {
            return <li key={idx} />;
          })}
      </ul>
    </div>
  );
};

export default AnimationBox;
