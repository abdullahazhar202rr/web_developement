  import React, { useEffect, useRef, useState } from 'react'
  import Btn from './components/Btn'
  import pic from "./assets/react.svg"

  const App = () => {
    let [a,newa]=useState(0)
    let [b,newb]= useState(0)
    useEffect(() => {
      let c=Math.floor(Math.random()*10)
      newb(()=>(b+c))
    }, [a])
    
    let hexColor = `#${b % 10}948${a % 10}2`;

    return (
      <div className='h-60 w-64 flex flex-col justify-center mt-[30vh] items-center m-auto  bg-amber-400'>
        <Btn className='bg-amber-900 mb-4 ' text={"Scale"} />
        <div className='text-2xl font-bold' >{a}</div>
      <Btn onClick={()=>{newa(a+1)}} className="mt-4" style={{ backgroundColor: hexColor }} text={"Add"} a={a} newa={newa}/>
        <img src={pic} alt="" />
      </div>
    )
  }

  export default App
