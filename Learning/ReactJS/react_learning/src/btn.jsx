import React from 'react'
import img from "./assets/react.svg"
function btn({a, b}) {
  function runb(){
    if (b){
      b(a+1)
    }
    else{
      alert("Not b present")
    }}
  return (
    <button onClick={()=>{runb()}} className='bg-blue-700  m-5 rounded-md px-3 py-1 cursor-pointer flex gap-5'>
        Click Me
        <img src={img}  alt="img" />
    </button>
  )
}

export default btn