import React from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faLinkedin } from "@fortawesome/free-brands-svg-icons";
import githubpic from '../assets/githubpic.webp';

function Navbar() {
  return (
    <div className="w-screen bg-gray-950 h-14 flex justify-around items-center">
      <div className="logo text-white text-2xl">
        <p>
          {"<Pass"}
          <span className="text-[var(--color)] font-bold">{`Op/>`}</span>
        </p>
      </div>
      <div className="flex items-center space-x-4">
        <a href="https://github.com/abdullahazhar202rr" target="_blank" rel="noopener noreferrer">
          <img className="hover:cursor-pointer rounded-full" width={40} src={githubpic} alt="GitHub Profile" />
        </a>
        <a href="https://www.linkedin.com/in/abdullahazhar202/" target="_blank" rel="noopener noreferrer">
          <FontAwesomeIcon icon={faLinkedin} className="text-white text-4xl mt-1 cursor-pointer" width={40} />
        </a>
      </div>
    </div>
  );
}

export default Navbar;
