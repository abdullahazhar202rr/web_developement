import React from 'react'

function Button(props) {
  return (
    <button onClick={props.onclick} 
    className={`p-3 py-5 px-8 border-2 mt-[16px] cursor-pointer rounded-xl  font-bold ${props.classname}`} >{props.text}</button>
  )
}

export default Button