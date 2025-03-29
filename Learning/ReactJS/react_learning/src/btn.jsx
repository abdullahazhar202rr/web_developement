import React from 'react'
function btn({a, b}) {
  return (
    <button onClick={()=>{b(a+1)}} className='bg-amber-400 rounded-md px-3 py-1 cursor-pointer'>
        Click Me
    </button>
  )
}

export default btn