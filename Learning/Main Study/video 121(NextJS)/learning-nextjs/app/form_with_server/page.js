'use client'
import { useForm } from 'react-hook-form'
import { onsubmit } from '@/actions/submit'

const form_with_server = () => {
     const {
       register,
       handleSubmit,
       formState: { errors },
       isSubmitting,
       reset,
     } = useForm();
const submitform= async (data) => {
    await onsubmit(data);
    reset();
    console.log(data.username)
    console.log(data.password)
    console.log(data)
}
  return (
    <div>
      <form onSubmit={handleSubmit(submitform)}  action='/' method="post" className='flex flex-col '>
      <input type="text" className='border-2 border-black p-2 m-5' placeholder='username' {...register('username',{required :true,maxLength:10,minLength:3})}/>
      {errors.username && <span className='text-red-700 m-auto'>Username is required and must be between 3 and 10 characters</span>}
      <input type="password" className='border-2 border-black p-2 m-5' placeholder='Enter Password'{...register('password',{required: true,minLength:5,maxLength:10})}/>
        {errors.password && <span className='text-red-700 m-auto'>Password is required and must be between 5 and 10 characters</span>}

        <input type="submit" disabled={isSubmitting} value="Submit" className='bg-red-600 text-white p-2 w-32 m-auto rounded-2xl cursor-pointer ' />
      </form>
    </div>
  )
}

export default form_with_server
