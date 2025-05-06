import React from "react";
import { FaUserCircle } from "react-icons/fa";
import { FaCartShopping } from "react-icons/fa6";
import { Link } from "react-router-dom";

function Navbar() {
  return (
    <div className="p-5 fixed top-0 left-0 w-full px-9 flex z-20 justify-between items-center text-gray-500">
      <div className="text-3xl font-bold fadein">
        Tech Trendz <br />
        <p className="text-xs font-normal">"Where Tech Meets Trend"</p>
      </div>

      <div className="flex gap-7 text-[18px] fadeup">
        <Link to="/commingsoon" className="cursor-pointer">Headphones</Link>
        <Link to="/commingsoon" className="cursor-pointer">Earbuds</Link>
        <Link to="/comingsoon" className="cursor-pointer">Smartwatches</Link>
        <Link to="/commingsoon" className="cursor-pointer">Premium Audio</Link>
        <Link to="/comingsoon" className="cursor-pointer">Tech Essentials</Link>
        <Link to="/comingsoon" className="cursor-pointer">Summer Collection</Link>
      </div>

      <div className="flex gap-5">
        <Link to="/comingsoon" className="cursor-pointer">
          <FaCartShopping className="text-[25px] hover:text-gray-700" />
        </Link>
        <Link to="/comingsoon" className="cursor-pointer">
          <FaUserCircle className="text-[25px] hover:text-gray-700" />
        </Link>
      </div>
    </div>
  );
}

export default Navbar;
