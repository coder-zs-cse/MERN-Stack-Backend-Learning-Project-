import React, { useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { useParams, useNavigate } from "react-router-dom";

const backendURL = import.meta.env.VITE_BACKEND_URL;

function ResetPassword() {
  const { token } = useParams();
  const [email, setEmail] = useState("");
  const navigate = useNavigate();

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };


  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const data = { ...Object.fromEntries(formData.entries()) };
    try {
      const response = await axios.patch(
        `${backendURL}/api/v1/user/reset-password`,
        { token, password: data.password },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      if (response.data.success === true) {
        toast.success("Password reset successfully");
        localStorage.setItem("token", response.data.data.token);
        toast('Redirecting to login page')
        navigate('/login')
        console.log("Password reset successfully");
      } else {
        toast.error(response.data.message);
        console.log("Error sending password reset link");
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
              Enter a new Password
            </h2>
          </div>
          <form
            className="flex flex-col mt-8 space-y-2"
            onSubmit={handleSubmit}
          >
            <label htmlFor="password">Password</label>
            <input
              id="password"
              name="password"
              type="password"
              autoComplete="current-password"
              required
              className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
              placeholder="Password"
            />
            <button
              type="submit"
              className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              Reset Password
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default ResetPassword;
