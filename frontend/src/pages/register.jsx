import React from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
const backendURL = import.meta.env.VITE_BACKEND_URL
import toast from 'react-hot-toast';

const Register = () => {
  const navigate = useNavigate()

  async function handleSubmit(event){
    console.log("jii");
    event.preventDefault();
    const formData = new FormData(event.target);
    const data = {...Object.fromEntries(formData.entries())};
    try{
      const response = await axios.post(`${backendURL}/api/v1/user/register`, data);
      console.log(response);
      if(response.data.success ==true){
        toast.success('User created successfully')
        toast('Redirecting to home page')
        navigate("/login");
      }
      else{
        toast.error(response.data.message)
      }
    }
    catch(err){
      toast.error(err)
      console.log(err);
    }
  }
  return (
    <div className="min-h-screen flex item-center justify-center bg-gray-100">
      <div className="w-full max-w-md space-y-8 p-10 my-5 bg-white rounded-xl shadow-lg flex flex-col justify-center">
        <div>
            <h2 className="mt-6 text-center text-3xl font-bold ">
                Sign Up
            </h2>
        </div>
        <form className="flex flex-col mt-8 space-y-2" onSubmit={handleSubmit}>

          <label htmlFor="Name">Name</label>
          <input
                id="email-address"
                name="name"
                type="name"
                autoComplete="Name"
                required
                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                placeholder="Enter your name"
              />
          <label htmlFor="email">Email Address</label>
          <input
                id="email-address"
                name="email"
                type="email"
                autoComplete="email"
                required
                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                placeholder="Email address"
              />
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
              Sign up
            </button>
            <div className="flex justify-end">
            <p className="mt-2 text-center text-sm text-gray-600">
              <a href="/login" className="font-medium text-indigo-600 hover:text-indigo-500">
                Already have an account? Login
              </a>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
};

export { Register };
