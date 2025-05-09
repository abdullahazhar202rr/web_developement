import React, { useState } from 'react'
import { useForm} from 'react-hook-form'


function App() {
const [asyncerror, setasyncerror] = useState("")

  const {
    register,
    handleSubmit,
    formState: { errors , isSubmitting },
    watch,
  } = useForm()

  const username=watch("username")
  const delay=(d)=>{
    return new Promise((res,rej)=>{
      setTimeout(() => {
        if(username==='hehe'){
          rej("This user not allowed")
        }
        else{
          res()
        }
      }, d*1000);
    })
  }
  const onSubmit= async(data)=>{
    setasyncerror("")
    try{
      await delay(3)
      let r = await fetch("http://localhost:3000/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      })
      
      let res=await r.text()
      console.log(data)

    }
    catch(err){
      setasyncerror("Error: "+err)

    }
  }

  return (
    <div className=" text-black flex  justify-center items-center h-[100dvh]">

    <form onSubmit={handleSubmit(onSubmit)} className='flex flex-col space-y-4 [&>input]:border [&>input]:p-2 [&>input]:rounded-lg'>
      {isSubmitting && <div className='text-blue-600'>Loading</div>}
      <input type="text" placeholder='Username' {...register("username",{required:true, minLength:{value:3,message:"Min length is 3"}})}/>
      <input type="text" placeholder='Enter your Password' {...register("password",{required:true})}/>
      {errors.username && <p>{errors.username.message}</p>}
      {asyncerror &&  <p className="text-red-600">{asyncerror}</p>}
      <input type="submit" disabled={isSubmitting} />
    </form>
    </div>
  )
}

export default App