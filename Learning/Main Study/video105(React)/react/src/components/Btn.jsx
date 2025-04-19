import React from 'react'

const Button = (props) => {
  const buttonText = props.text || "Default Button";
  return (
    <button onClick={props.onClick} style={props.style} className={`px-4 py-2 border-2 text-white rounded-2xl ${props.className}`}>{buttonText}</button>
  )
}

export default Button
