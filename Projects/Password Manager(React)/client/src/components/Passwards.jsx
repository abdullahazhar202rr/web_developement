import React from "react";

function Passwards(props) {
  return (
    <div>
      <div className="w-full h-fit flex  justify-around items-center ] py-3 border-b-2 bg-green-300 ">

      <div className="w-1/1 text-center">{props.pass.Website}</div>
      <div className="w-1/2 text-center"> {props.pass.Username}</div>
      <div className="w-1/2 text-center"> {props.pass.Password}</div>
      <div className="w-1/2 text-center"> {props.pass.Password}</div>
      </div>
    </div>
  );
}

export default Passwards;
