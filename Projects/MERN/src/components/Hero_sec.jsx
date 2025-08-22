import React from 'react'
import Button from './Button'

function Hero_sec() {
  let handleonclick=()=>alert("Wait Bruhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhh!")
  return (

    <div className='text-white flex flex-col items-start m-20 mt-[230px] w-[700px] p-5   '>

        <h1 className='text-6xl font-bold fadein'>
        Innovate Your Digital Lifestyle</h1>
        <p className='text-2xl pt-[40px] fadein'>Discover the perfect blend of technology and style with Tech Trendz. Our products are designed to enhance your everyday life.</p>
        <Button text={"Shop Now"} onclick={handleonclick} classname={"bg-white text-black hover:bg-gray-600 hover:text-white fadeup"}/>
        
    </div>
  )
}

export default Hero_sec