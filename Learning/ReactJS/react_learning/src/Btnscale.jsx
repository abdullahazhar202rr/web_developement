import React from 'react'

function Btnscale({toggle,s}) {
    function runtoggle(){
        if(toggle){
          toggle();
        }
        else{
          alert("Not toggle present")
        }
      }
      return (
        <button onClick={runtoggle} className='bg-amber-400 m-5 rounded-md px-3 py-1 cursor-pointer'>
            {s ? "Descale":"Scale"}
        </button>
)}

export default Btnscale