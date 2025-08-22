import React from 'react'

function Navbar() {
  return (
    <div className=' w-[100dvw] h-[10vh] bg-[#323252] flex justify-around items-center px-5 '>
        <nav className='text-white font-bold '>
            <ul className='flex gap-x-10 '>
                <li className='animate2 hover:scale-120 hover:text-[#FF007A]   transition-all duration-300'><a href="#"  className=''>Home</a></li>
                <li className='animate2 hover:text-[#FF007A] hover:scale-120 transition-all duration-300'><a href="#">Completed Tasks</a></li>
                <li className='animate2 hover:text-[#FF007A] hover:scale-120 transition-all duration-300'><a href="#">Pending Tasks</a></li>
                <li className='animate2 hover:text-[#FF007A] hover:scale-120 transition-all duration-300'><a href="#">About</a></li>
                <li className='animate2 hover:text-[#FF007A] hover:scale-120 transition-all duration-300'><a href="#">Contact</a></li>
            </ul>
        </nav>
    </div>
  )
}

export default Navbar