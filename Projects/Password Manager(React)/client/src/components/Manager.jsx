import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { FaEye } from "react-icons/fa6";
import { FaEyeSlash } from "react-icons/fa";
import Passwords from '../components/Passwards'
function Manager() {
  const [showpass, setShowpass] = useState(false);
  const [pass, setpass] = useState([])

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors, isSubmitting, isSubmitSuccessful },
  } = useForm();

  const showpassword = () => {
    setShowpass((prev) => !prev);
  };

  const onsubmit = (data) => {
    const newpass=[...pass, data]
    setpass(newpass)
    console.log("Hii",data)
    console.log(pass)
  };

  useEffect(() => {
    if (isSubmitSuccessful) {
      alert("Submitted Successfully");
      console.log("Updated pass list:", pass);
    }
  }, [isSubmitSuccessful]);



  return (
    <div>
      <div className="m-auto w-[70dvw] h-[80dvh] border-2 flex items-center flex-col rounded-2xl mt-5">
        <h1 className="text-3xl font-bold">
          <p>
            {"<Pass"}
            <span className="text-[var(--color)] ">{`Op/>`}</span>
          </p>
        </h1>
        <h2>Your own Password Manager</h2>

        <div>
          <form
            onSubmit={handleSubmit(onsubmit)}
            className="m-12 flex flex-col"
          >
            <input
              type="text"
              className="w-[800px] p-1.5 border-2 rounded-3xl flex m-2.5"
              placeholder="Enter the site URL"
              {...register("Website", { required: true })}
            />

            <div className="relative flex">
              <input
                type="text"
                className="w-[600px] p-1.5 border-2 rounded-3xl m-2.5"
                placeholder="Enter the Username"
                {...register("Username", { required: true })}
              />
              <input
                type={showpass ? "text" : "password"}
                className="p-1.5 border-2 rounded-3xl m-2.5 flex"
                placeholder="Enter the Password"
                {...register("Password", { required: true })}
              />
              <span
                className="absolute right-5 top-5.5 cursor-pointer"
                onClick={showpassword}
              >
                {" "}
                {showpass ? <FaEye /> : <FaEyeSlash />}
              </span>
            </div>
            <div className="justify-around items-center m-auto mt-3 text-2xl  flex bg-[var(--color)] w-[220px] rounded-full cursor-pointer h-14">
              <input
                type="submit"
                value="Add Password"
                className="cursor-pointer  rounded-full "
                disabled={isSubmitting}
              />
              <lord-icon
                src="https://cdn.lordicon.com/tsrgicte.json"
                trigger="hover"
                colors="primary:#121331,secondary:#000000"
                style={{ width: "50px", height: "50px" }}
              ></lord-icon>
            </div>

            {isSubmitting && <div className="text-red-600">Submitting</div>}
          </form>
          <div>
           
        <h1 className="font-bold mb-3 ">Your Passwords</h1>
      <div className="w-full h-10 text-white flex justify-around items-center rounded-t-2xl bg-green-900">
        <div className="w-1/1 text-center">Website</div>
        <div className="w-1/2 text-center">Username</div>
        <div className="w-1/2 text-center">Password</div>
        <div className="w-1/2 text-center">Actions</div>
      </div>
      <div className="h-[200px] overflow-auto rounded-b-2xl">

      {pass.length> 0 ? (
        pass.map((task,index) => (
          <Passwords key={index} pass={task}/>
        ))
      )
      : (<div className="text-center p-4"> No Data to show</div>)
    }
    </div>

          </div>
        </div>
      </div>
    </div>
  );
}

export default Manager;
