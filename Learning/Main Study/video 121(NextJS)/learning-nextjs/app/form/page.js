"use client";
import React from "react";
import { useForm } from "react-hook-form";

const Form = () => {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();

  let onsubmit = async(data) => {
    let r = await fetch("api/add/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      })
      let res= await r.json();
      console.log(res);
  }

  return (
    <div>
      <form
        onSubmit={handleSubmit(onsubmit)}
        className="flex flex-col gap-4"
      >
        <input
          type="text"
          placeholder="Enter your name"
          {...register("name", { required: true })}
          className="border-2 border-gray-300 p-2 rounded-md"
        />
        {errors.name && (
          <span className="text-red-500">This field is required</span>
        )}

        <input
          type="email"
          placeholder="Enter your email"
          {...register("email", { required: true })}
          className="border-2 border-gray-300 p-2 rounded-md"
        />
        {errors.email && (
          <span className="text-red-500">This field is required</span>
        )}

        <button
          type="submit"
          className="bg-blue-500 text-white p-2 rounded-md hover:bg-blue-600 transition-colors duration-300"
        >
          Submit
        </button>
      </form>
    </div>
  );
};

export default Form;
