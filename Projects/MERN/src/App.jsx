import React, { useState, useEffect } from 'react'
import Navbar from './components/Navbar'
import pic2 from "./assets/pic2.jpeg"
import pic3 from "./assets/pic3.webp"
import pic6 from "./assets/pic6.webp"
import Hero_sec from './components/Hero_sec'

function App() {
  const images = [pic2, pic3, pic6]
  const [index, setIndex] = useState(0)
  useEffect(() => {
    const nextimage=setInterval(() => {
      setIndex((prevIndex) => (prevIndex + 1) % images.length);
      
    }, 4000);
  
    return () => {clearInterval(nextimage)}
  }, [])
  
  return (
<>
<header>
  <Navbar />
</header>
<section className="relative w-full h-[100vh] overflow-hidden z-10 ">

        <div
          className="absolute top-0 left-0 w-full h-full bg-center bg-cover zoom z-[-1]"
          style={{backgroundImage: `url(${images[index]})`}}
          ></div>
        <div className="absolute top-0 left-0 w-full h-full bg-black opacity-80 z-[-1]"></div>


      <div className="relative z-10">
        
        <Hero_sec/>
      </div>
</section>
    </>
  )
}

export default App