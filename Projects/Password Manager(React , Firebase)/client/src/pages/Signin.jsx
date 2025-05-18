import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { app } from "../firebase";
const auth = getAuth(app);

const Login = () => {
  const [loginerror, setLoginerror] = useState("");
  const [loading, setloading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const navigate = useNavigate();
  const onSubmit = (data) => {
    setloading(true);
    signInWithEmailAndPassword(auth, data.email, data.password)
      .then((userCredential) => {
        alert("Logged In");
        navigate("/dashboard");
      })
      .catch((error) => {
        alert(`Error signing in user: ${error.message}`);
      })
      .finally(() => {
        setloading(false);
      });
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-teal-900 to-gray-900 px-4">
      <div className="bg-gradient-to-br from-gray-900 via-teal-900 to-gray-800 p-10 rounded-3xl max-w-md w-full shadow-2xl text-white">
        <h1 className="text-4xl font-extrabold mb-2 text-center tracking-wide">
          Welcome Back
        </h1>
        <p className="text-center text-teal-300 mb-8 font-medium text-lg">
          Sign in to your account
        </p>

        <form
          onSubmit={handleSubmit(onSubmit)}
          className="space-y-6"
          noValidate
        >
          {/* Email */}
          <div>
            <input
              type="email"
              placeholder="Email"
              {...register("email", {
                required: "Email is required",
                pattern: {
                  value: /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/,
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
          <div>
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
          {loginerror && (
            <div className="bg-red-600/90 text-white p-3 rounded-lg text-sm text-center shadow-md ">
              {loginerror}
            </div>
          )}
          {loading && (
            <p className="text-center text-teal-300 font-medium">
              Signing in...
            </p>
          )}

          {/* Submit Button */}
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-teal-500 cursor-pointer hover:bg-teal-600 transition text-white font-semibold text-lg py-3 rounded-lg shadow-lg shadow-teal-700/50"
          >
            {loading ? "Please wait..." : "Sign In"}
          </button>
        </form>

        <p className="mt-8 text-center text-white font-medium">
          Don’t have an account?{" "}
          <Link
            to="/signup"
            className="text-teal-500 font-bold hover:underline cursor-pointer"
          >
            Register
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
