import React, { useEffect, useState } from "react";
import Navbar from "./components/Navbar";
import Task from "./components/Task";

function App() {
  const [todos, settodos] = useState([])
  const [inputvalue, setinputvalue] = useState("")

    
  useEffect(() => {
      const todostring = localStorage.getItem("todos")
      if(todostring){
          const todoarray = JSON.parse(todostring)
          settodos(todoarray)
      }
  }, [])
  

  const handleclick = () => {
      if(inputvalue){
          const newtodo = [...todos, inputvalue]
          settodos(newtodo)
          localStorage.setItem("todos", JSON.stringify(newtodo))
          setinputvalue("")
      }
  }
const ondelete = (index) => {
    const newtodo = todos.filter((_, i) => i !== index)
    settodos(newtodo)
    localStorage.setItem("todos", JSON.stringify(newtodo))
}




  return (
    <div className="bg-[#1E1E2F] w-[100dvw] h-[100vh] flex flex-col justify-center items-center">

      <Navbar />


      <div className="animate w-[40dvw] h-[80vh] bg-[#323252] mt-10 m-auto rounded-lg overflow-hidden">


        <h1 className="text-white text-3xl animate2 font-bold text-center m-5">
          Task Manager
        </h1>
          <form className="flex justify-around items-center p-5 animate2" action="#">
          <input
            type="text"
            value={inputvalue}
            onChange={(e) => setinputvalue(e.target.value)} 
            placeholder="Add a new task"
            className="w-[60%] h-[5vh] rounded-lg p-3 outline-1 outline-[#1E1E2F] bg-[#1E1E2F] text-white"/>
          <input type="button" value="Add Task" className="bg-[#FF007A] w-[30%] h-[5vh]  rounded-lg font-bold text-white" onClick={handleclick} />
            </form>
        <hr className="border-t border-white m-5" />
        {todos.map((task,index) => (
          <Task key={index} task={task} ondelete={() => ondelete(index)}/>
        ))}
      </div>


    </div>
  );
}

export default App;
