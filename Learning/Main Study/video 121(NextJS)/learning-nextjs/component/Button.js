import React from 'react'
import Link from "next/link";

function Button(props) {
  return (
    <div>
        <Link href={`/${props.text}`} className="my-5 p-3 w-32 mx-auto bg-amber-800 hover:bg-blue-700 rounded-2xl transition-all duration-500 text-center inline-flex items-center justify-center text-white">{props.text}</Link>
    </div>
  )
}

export default Button