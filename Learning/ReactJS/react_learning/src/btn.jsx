import React from 'react'
function btn({a, b}) {
  function runb(){
    if (b){
      b(a+1)
    }
    else{
      alert("Not b present")
    }}
  return (
    <button onClick={()=>{runb()}} className='bg-amber-400 m-5 rounded-md px-3 py-1 cursor-pointer'>
        Click Me
    </button>
  )
}

export default btn