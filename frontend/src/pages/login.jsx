import React from "react";
import { useState } from "react";
import Loading from "../components/loading";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { GoogleLogin } from "@react-oauth/google";
import FacebookLogin from "@greatsumini/react-facebook-login";

const app_id = "996704532146488";

const backendURL = import.meta.env.VITE_BACKEND_URL;

const Login = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  async function handleSubmit(event) {
    setLoading(true);
    event.preventDefault();
    const formData = new FormData(event.target);
    const data = { ...Object.fromEntries(formData.entries()) };
    try {
      const response = await axios.post(
        `${backendURL}/api/v1/user/login`,
        data
      );
      if (response.data.success == true) {
        const token = response.data.data.token;
        localStorage.setItem("token", token);
        toast.success("Logged in successfully");
        toast("Redirecting to home page");
        navigate("/home");
      } else {
        toast.error(response.data.message);
      }
    } catch (err) {
      console.log(err);
      toast.error(err);
    }
    setLoading(false);
  }
  async function handleLoginSuccess(accessToken, provider) {
    setLoading(true);
    try {
      const response = await axios.post(
        `${backendURL}/api/v1/user/auth/${provider}`,
        {
          token: accessToken,
        }
      );
      // console.log("token: ",response.data.data.token);
      localStorage.setItem("token", response.data.data.token);
      navigate("/home");
    } catch (err) {
      console.log(err);
    }
    setLoading(false);
  }
  return (
    <div className="min-h-screen flex item-center justify-center bg-gray-100">
      {loading ? (
        <Loading />
      ) : (
        <div className="w-full max-w-md space-y-8 p-10 my-5 bg-white rounded-xl shadow-lg flex flex-col justify-center">
          <div>
            <h2 className="mt-6 text-center text-3xl font-bold ">
              Log in to your account
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
            <label htmlFor="role">Role</label>

            <select
              id="role"
              name="role"
              required
              className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 bg-white text-gray-900 rounded-b-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            >
              <option value="">Select your role</option>
              <option value="user">Patient</option>
              <option value="doctor">Doctor</option>
            </select>
            <button
              type="submit"
              className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              Sign in
            </button>
            <div className="flex flex-col items-center">
              <div className="my-2 px-2 w-full flex justify-between flex-wrap ">
                <a
                  href="/forgot-password"
                  className=" text-sm text-indigo-600 hover:text-indigo-500"
                >
                  Forgot password?
                </a>
                <p className="ml-auto inline-block text-sm text-gray-600">
                  <a
                    href="/register"
                    className="font-medium text-indigo-600 hover:text-indigo-500"
                  >
                    Don't have an account? Register
                  </a>
                </p>
              </div>
              <div className="space-y-2 flex flex-col items-center">
                <GoogleLogin
                  onSuccess={(response) =>
                    handleLoginSuccess(response.credential, "google")
                  }
                  onError={() => {
                    console.log("Login Failed");
                  }}
                />
                <FacebookLogin
                  appId={app_id}
                  style={{
                    backgroundColor: "#4267b2",
                    color: "#fff",
                    fontSize: "16px",
                    padding: "6px 24px",
                    border: "none",
                    borderRadius: "4px",
                  }}
                  onSuccess={(response) =>
                    handleLoginSuccess(response.accessToken, "facebook")
                  }
                  onFail={(error) => {
                    console.log("Login Failed!", error);
                  }}
                  onProfileSuccess={(response) => {
                    console.log("Get Profile Success!", response);
                  }}
                />
              </div>
            </div>
          </form>
        </div>
      )}
    </div>
  );
};

export { Login };
