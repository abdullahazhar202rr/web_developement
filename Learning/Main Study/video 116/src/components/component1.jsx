import React, { useContext } from 'react'
import { content } from '../content/content' 

function component1() {
    const count= useContext(content)
  return (
    <div>{count}</div>
  )
}

export default component1