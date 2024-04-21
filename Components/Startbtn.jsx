import { useState } from "react";

export default function Startbtnx(props) {
  return (
    <div className="flex">
      <button className="bg-black  text-yellow-500 mt-[50px] w-[100px] h-[50px] ml-4">
        {props.score}
      </button>
    </div>
  );
}
