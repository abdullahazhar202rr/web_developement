import React, { useEffect, useMemo, useState } from 'react'
import { MdDelete } from 'react-icons/md'

function Task(props) {
    const [ischecked, setIsChecked] = useState(false)
    const handleCheck = () => {
        setIsChecked(!ischecked)
    }
    const handledelete = () => {
        props.ondelete()
    }


    

  return (
      <div  className='animate2 w-[60%] h-auto  rounded-lg p-3 list-none m-5  bg-[#1E1E2F] text-white flex gap-2.5 justify-between'>
        <input type="checkbox" name="check" checked={ischecked} id="check" onChange={handleCheck} />
        <li className={ischecked?`line-through`:""}>{props.task}</li>
        <span className='m-1 cursor-pointer text-red-500' onClick={handledelete}><MdDelete size={20}/></span>
    </div>
  )
}

export default Task