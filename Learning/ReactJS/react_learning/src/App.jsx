import React, { useState } from 'react'
import Btn from './btn.jsx'
import Btnscale from './Btnscale.jsx';
function App() {
  let [a,b]=useState(0);
  let [scale,setscale]=useState(false)
  return (
    <div className="w-full h-screen bg-red-400 flex content-center">
      <div className={` w-64 h-64 bg-zinc-600 m-auto flex flex-col items-center justify-center ${scale ? "scale-210 ":"scale-100"} transition-all duration-300 ease-linear rounded-md`}>
      <h1 className='text-xl text-white'>{a}</h1>
        <Btn a={a} b={b}/>
        <button onClick={()=>b(0)} className={`button transition ${a==0 ? "bg-green-400" : "bg-red-500"}`} >{a!=0?"Reset": "Already 0"}</button>
        <Btnscale toggle={()=>setscale(!scale)} s={scale} />
      </div>
    </div>
  )
}

export default App