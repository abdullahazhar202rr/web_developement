import React, { useMemo } from 'react'
import Navbar from './Navbar'

function home() {
  return (
    <>
    <Navbar/>
    <div className='m-auto mt-[10vh] bg-gray-900 text-white w-[50vw] h-[50vh] rounded-3xl'> 

    <h1 className='flex justify-center p-[20px]'>About Me</h1>
    <div className='flex justify-center p-[20px] text-justify'>
      <p>Lorem, ipsum dolor. Lorem ipsum dolor sit amet consectetur adipisicing elit. Omnis eligendi ratione dolorem autem natus placeat quaerat? Ipsam assumenda dolorem fugit facere et, corporis voluptas doloribus debitis veritatis laboriosam quibusdam distinctio!</p>
    </div>
    </div>
    </>
  )
}
export default home