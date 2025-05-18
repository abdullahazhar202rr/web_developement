import React, { useEffect, useState } from "react";
import { FaArrowTurnUp, FaEye } from "react-icons/fa6";
import { FaEyeSlash } from "react-icons/fa";

function Passwards(props) {
  const handleclick = (text) => {
    navigator.clipboard.writeText(text);
    alert("copied: " + text);
  };


  const [Showpass, setShowpass] = useState(false);
  const showpassword = () => {
    setShowpass((prev) => !prev);
  };


  const handledelete = () => {
    props.del();
  };
  return (
    <div>
      <div className="w-full h-fit flex  justify-around items-center ] py-3 border-b-2 bg-green-300 ">
        <div className="w-1/1 text-center flex items-center justify-center gap-8">
          {props.pass.Website}{" "}
          <a
            href={props.pass.Website}
            onClick={() => {
              handleclick(props.pass.Website);
            }}
          >
            <lord-icon
              src="https://cdn.lordicon.com/ojxbzlys.json"
              trigger="hover"
              style={{ width: "60px", height: "40px", cursor: "pointer" }}
            ></lord-icon>
            <p className="text-sm flex gap-2">Copy <FaArrowTurnUp/></p>
          </a>
        </div>
        <div className="w-1/2 text-center"> {props.pass.Username}</div>
        <div className="w-1/2 text-center flex justify-center gap-5">
          {" "}
          {Showpass ? props.pass.Password : "*".repeat(props.pass.Password.length)}
        {" "}
          <span
            className="cursor-pointer"
            onClick={showpassword}
          >

            {Showpass ? <FaEye /> : <FaEyeSlash />}
          </span>
        </div>
        <div className="w-1/2 text-center">
          <lord-icon
            src="https://cdn.lordicon.com/hwjcdycb.json"
            trigger="hover"
            onClick={handledelete}
            style={{ width: "60px", height: "30px", cursor: "pointer" }}
          ></lord-icon>
        </div>
      </div>
    </div>
  );
}

export default Passwards;
