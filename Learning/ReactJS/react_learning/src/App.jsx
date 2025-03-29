import React, { useState } from 'react'
import Btn from './btn.jsx'
function App() {
  let [a,b]=useState(0);
  return (
    <div className="w-full h-screen bg-red-400 flex content-center">
      <div className='w-96 h-96 bg-zinc-600 m-auto flex flex-col items-center justify-center'>
      <h1 className='text-xl text-white'>{a}</h1>
        <Btn b={b} a={a}/>
        <button onClick={()=>b(0)} className={`button mt-5 transition ${a==0 ? "bg-green-400" : "bg-red-500"}`} >{a!=0?"Reset": "Already 0"}</button>
      </div>
    </div>
  )
}

export default App