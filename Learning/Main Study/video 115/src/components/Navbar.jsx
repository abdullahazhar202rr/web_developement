import React, {  useState } from 'react'
import { Link } from 'react-router-dom'

function Navbar() {
  const [bg, setBg] = useState(false)
  return (
    <nav className={`flex p-2 list-none text-white gap-16 justify-center ${(bg==false)?"bg-sky-800":"bg-black"}`}>
        <li><Link className='hover:text-red-600' onMouseOver={()=>(setBg(true))} onMouseOut={()=>(setBg(false))} to="/home">Home</Link></li>
        <li><Link className='hover:text-red-600' onMouseOver={()=>(setBg(true))} onMouseOut={()=>(setBg(false))} to="/">About  </Link></li>
        <li><Link className='hover:text-red-600' onMouseOver={()=>(setBg(true))} onMouseOut={()=>(setBg(false))} to="/">Contact</Link></li>
    </nav>
  )
}

export default Navbar