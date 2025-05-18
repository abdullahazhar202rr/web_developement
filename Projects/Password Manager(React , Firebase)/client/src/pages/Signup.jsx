import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { app } from "../firebase";
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
const auth = getAuth(app);

const Register = () => {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();

  const password = watch("password", "");
  const [loading, setloading] = useState(false);

  const navigate = useNavigate();
  const onSubmit = (data) => {
    setloading(true);

    createUserWithEmailAndPassword(auth, data.email, data.password)
      .then((userCredential) => {
        alert("Account Created");
        navigate("/signin");
      })
      .catch((error) => {
          alert(`Error registering user: ${error.message}`);
        
      })
      .finally(() => {
        setloading(false);
      });
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-teal-900 to-gray-900 flex items-center justify-center px-4">
      <div className="bg-gradient-to-br from-gray-900 via-teal-900 to-gray-800 p-10 rounded-3xl max-w-md w-full shadow-2xl text-white">
        <h1 className="text-4xl font-extrabold mb-2 text-center tracking-wide">
          Create Account
        </h1>
        <p className="text-center text-teal-300 mb-8 font-medium text-lg">
          Register
        </p>

        <form onSubmit={handleSubmit(onSubmit)} noValidate>
          {/* Username */}
          <div className="mb-6">
            <input
              type="text"
              placeholder="Username"
              {...register("username", { required: "Username is required" })}
              className={`w-full px-5 py-3 rounded-lg bg-gray-900 border ${
                errors.username
                  ? "border-red-500"
                  : "border-teal-500 hover:border-teal-400"
              } text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-teal-400 transition`}
              autoComplete="off"
            />
            {errors.username && (
              <p className="mt-1 text-sm text-red-500">
                {errors.username.message}
              </p>
            )}
          </div>

          {/* Email */}
          <div className="mb-6">
            <input
              type="email"
              placeholder="Email"
              {...register("email", {
                required: "Email is required",
                pattern: {
                  value: /^\S+@\S+$/i,
                  message: "Invalid email address",
                },
              })}
              className={`w-full px-5 py-3 rounded-lg bg-gray-900 border ${
                errors.email
                  ? "border-red-500"
                  : "border-teal-500 hover:border-teal-400"
              } text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-teal-400 transition`}
              autoComplete="off"
            />
            {errors.email && (
              <p className="mt-1 text-sm text-red-500">
                {errors.email.message}
              </p>
            )}
          </div>

          {/* Password */}
          <div className="mb-6">
            <input
              type="password"
              placeholder="Password"
              {...register("password", {
                required: "Password is required",
                minLength: {
                  value: 6,
                  message: "Password must be at least 6 characters",
                },
              })}
              className={`w-full px-5 py-3 rounded-lg bg-gray-900 border ${
                errors.password
                  ? "border-red-500"
                  : "border-teal-500 hover:border-teal-400"
              } text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-teal-400 transition`}
            />
            {errors.password && (
              <p className="mt-1 text-sm text-red-500">
                {errors.password.message}
              </p>
            )}
          </div>

          {/* Confirm Password */}
          <div className="mb-8">
            <input
              type="password"
              placeholder="Confirm Password"
              {...register("confirm_password", {
                required: "Please confirm your password",
                validate: (value) =>
                  value === password || "Passwords do not match",
              })}
              className={`w-full px-5 py-3 rounded-lg bg-gray-900 border ${
                errors.confirm_password
                  ? "border-red-500"
                  : "border-teal-500 hover:border-teal-400"
              } text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-teal-400 transition`}
            />
            {errors.confirm_password && (
              <p className="mt-1 text-sm text-red-500">
                {errors.confirm_password.message}
              </p>
            )}
          </div>
          {loading && (
            <p className="text-center text-sm text-teal-300 font-medium mb-2">
              Registering...
            </p>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-teal-500 cursor-pointer hover:bg-teal-600 transition text-white font-semibold text-lg py-3 rounded-lg shadow-lg shadow-teal-700/50"
          >
            {loading ? "Please wait..." : "Register"}
          </button>
        </form>

        <p className="mt-6 text-center text-white font-medium">
          Already have an account?{" "}
          <Link
            to={"/signin"}
            className="text-teal-500 font-bold hover:underline cursor-pointer"
          >
            Sign In
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Register;
