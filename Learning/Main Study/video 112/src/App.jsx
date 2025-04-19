import React, { useEffect, useState } from 'react'

const App = () => {
  const [inputvalue, setInputvalue] = useState("Abdullah Azhar")
  const handleChange = (e)=>{
    setInputvalue(e.target.value)
  }
  const btn=()=>{
    alert(inputvalue)
  }
  
  return (
    <div>
      <input type="text" value={inputvalue} onChange={handleChange}/>
      <button onClick={btn}>Click me </button>
    </div>
  )
}

export default App
