import React from "react";

const Dot = () => {
  return <div className="w-3 h-3 bg-white rounded-full"></div>;
};

const Pitdots = () => {
  const dots = [];
  for (let i = 0; i < 20; i++) {
    for (let j = 0; j < 10; j++) {
      dots.push(<Dot key={`${i}-${j}`} />);
    }
  }

  return <div className="w-96 h-48 bg-black flex flex-wrap">{dots}</div>;
};

export default Pitdots;
