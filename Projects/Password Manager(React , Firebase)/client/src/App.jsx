import React, { useState } from "react";
import Navbar from "./components/Navbar";
import sitepic from "./assets/site.webp";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";

const AuthModal = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg shadow-lg max-w-sm w-full p-6 relative">
        <button
          onClick={onClose}
          className="absolute top-3 right-3 text-gray-500 hover:text-gray-700 font-bold text-xl"
          aria-label="Close modal"
        >
          <span className="cursor-pointer">

          &times;
          </span>
        </button>

        <p className="text-gray-800 text-center text-lg font-semibold mb-8">
          Please sign in to use
        </p>

        <div className="flex justify-between">
          <Link
            to="/signin"
            className="px-4 py-2 bg-teal-600 text-white rounded-md hover:bg-teal-700 transition"
            onClick={onClose}
          >
            Sign In
          </Link>
          <Link
            to="/signup"
            className="px-4 py-2 bg-teal-600 text-white rounded-md hover:bg-teal-700 transition"
            onClick={onClose}
          >
            Sign Up
          </Link>
        </div>
      </div>
    </div>
  );
};

function App() {
  const navigate = useNavigate();
  const [modalOpen, setModalOpen] = useState(false);

  const handleclick = () => {
    setModalOpen(true);
  };

  return (
    <div className="bg-green-100 max-h-[95dvh] max-w-[100-dvw]">
      <Navbar />

      <img
        src={sitepic}
        onClick={handleclick}
        alt="Site"
        className="cursor-pointer w-[99%] "
      />

      <AuthModal isOpen={modalOpen} onClose={() => setModalOpen(false)} />
    </div>
  );
}

export default App;
