import React from 'react'
import Link from 'next/link'
const Navbar = () => {
  return (
    <div className='bg-blue-950 h-10 flex justify-around text-white items-center'>
      <Link href='/'><h1>GetmeaChai</h1> </Link>
      <ul className='flex gap-10'>
        <Link href='#'> <li>Home</li> </Link>
        <Link href='#'> <li>About</li> </Link>
        <Link href='#'> <li>Signup</li> </Link>
        <Link href='#'> <li>Login</li> </Link>
      </ul>
    </div>
  )
}

export default Navbar
