import React from 'react'
import pic from '../assets/pic.jpg'
function Card({text,title}) {
  return (
    <div className='w-60 h-96 border-black border-2 rounded-2xl overflow-hidden m-20 text-white bg-gray-800 hover:scale-125'>
        <img src={pic} alt="pic" width={250} height={200} className='rounded-2xl' />
        <h1 className='font-bold py-2'>{title}:</h1>
        <p className='p-2 w-56 m-auto'>{text}
        </p>
    </div>
  )
}

export default Card