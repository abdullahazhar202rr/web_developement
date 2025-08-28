import React from 'react'
import pic from "../assets/pic.jpg";


function navbar() {
  return (
    <div>
        <header className="flex justify-between items-center p-4 bg-gray-800 text-white">
            <div className="img">
            <img src={pic} alt="pic" width={50} className="rounded-full" />
            </div>
            <nav className="flex space-x-4">
            <a href="#" className="hover:text-gray-400">Home</a>
            <a href="#" className="hover:text-gray-400">About</a>
            <a href="#" className="hover:text-gray-400">Services</a>
            <a href="#" className="hover:text-gray-400">Contact</a>
            </nav>
        </header>
    </div>
  )
}

export default navbar