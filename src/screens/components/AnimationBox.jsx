import React from "react";

const AnimationBox = () => {
  return (
    <div className="animation-box">
      <ul className="items">
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
