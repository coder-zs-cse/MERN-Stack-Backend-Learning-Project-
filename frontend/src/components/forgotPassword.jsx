import React, { useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
const backendURL = import.meta.env.VITE_BACKEND_URL;

function ForgotPassword() {
  const [email, setEmail] = useState("");

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
        const response = await axios.post(
          `${backendURL}/api/v1/user/forgot-password`,
          { email }, 
          {
            headers: {
              "Content-Type": "application/json",
            },
          }
        );
        if (response.data.success === true) {
          toast.success("Password reset link sent to your email");
          // console.log("Password reset link sent");
        } else {
          toast.error(response.data.message);
          // console.log("Error sending password reset link");
        }
      } catch (error) {
        toast.error("Server error");
        console.log(error);
      }
  };

  return (
    <div className="min-h-screen flex item-center justify-center bg-gray-100">
      <div className="w-full max-w-md space-y-8 p-10 my-5 bg-white rounded-xl shadow-lg flex flex-col justify-center">
        <div className="forgot-password">
          <div>
            <h2 className=" text-center text-3xl font-bold ">
              Reset your Password
            </h2>
          </div>
          <form
            className="flex flex-col mt-8 space-y-2"
            onSubmit={handleSubmit}
          >
            <label htmlFor="email">Email Address</label>
            <input
              id="email-address"
              name="email"
              type="email"
              autoComplete="email"
              required
              onChange={handleEmailChange}
              className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
              placeholder="Email address"
            />
            <button
              type="submit"
              className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              Send Reset Link
            </button>
            <div className="flex ">
              <p className="mt-2 ml-auto text-center text-sm text-gray-600">
                <a
                  href="/login"
                  className="font-medium text-indigo-600 hover:text-indigo-500"
                >
                  Go back to login
                </a>
              </p>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default ForgotPassword;
