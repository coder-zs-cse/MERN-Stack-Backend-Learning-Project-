import React from "react";
import { useSelector } from "react-redux";
import { useState } from "react";
import toast from "react-hot-toast";
import axios from "axios";
import { setUser } from "../redux/userSlice";
import { useDispatch } from "react-redux";
import ProfileCard from "../components/profileCard";
import Loading from "../components/loading";
const backendURL = import.meta.env.VITE_BACKEND_URL;

function Profile() {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const { user } = useSelector((state) => state.user);
  const [showChangeUserForm, setShowChangeUserForm] = useState(false);
  const [newUserData, setNewUserData] = useState({
    name: "",
    email: "",
  });
  // console.log(user);
  const handleNewUserToggle = () => {
    setShowChangeUserForm(!showChangeUserForm);
  };
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewUserData({
      ...newUserData,
      [name]: value,
    });
  };
  const handleSubmitNewUser = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await axios.put(
        `${backendURL}/api/v1/user/update-user-profile`,
        {
          ...newUserData,
          // previousEmail: user.email,
          id: user.id,
        },
        {
          headers: {
            Authorization: "Bearer " + localStorage.getItem("token"),
          },
        }
      );
      if (response.data.success) {
        dispatch(setUser(response.data.data));
        toast.success(response.data.message);
      } else {
        toast.error(response.data.message);
        return;
      }
    } catch (error) {
      console.log(error);
    }
    setLoading(false);
    handleNewUserToggle();
  };

  const handlePasswordChange = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      console.log(user?.email);
      const response = await axios.post(
        `${backendURL}/api/v1/user/forgot-password`,
        { email: user?.email },
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
    setLoading(false);

  };

  const handleSubscribe = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await axios.post(
        `${backendURL}/api/v1/user/subscribe-newsletter`,
        { email: user?.email },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      if (response.data.success === true) {
        toast.success("Newsletter subscribed successfully");
        // console.log("Password reset link sent");
      } else {
        toast.error(response.data.message);
        // console.log("Error sending password reset link");
      }
    } catch (error) {
      toast.error("Server error");
      console.log(error);
    }
    setLoading(false);
  };

  return (
    <div>
      {loading ? (
        <Loading />
      ) : (
        <>
          {showChangeUserForm && (
            <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
              <div className="bg-white   rounded-lg ">
                <button onClick={handleNewUserToggle}>
                  <i className="ri-close-circle-line text-blue-700 text-4xl sm:text-4xl md:text-4xl"></i>
                </button>
                <form
                  onSubmit={handleSubmitNewUser}
                  className=" p-5 space-y-5 flex flex-col"
                >
                  <div>
                    <h2 className="text-xl font-bold text-center my-2 text-gray-800">
                      Change Profile Details
                    </h2>
                  </div>
                  <div className="flex flex-wrap md:flex-nowrap items-center space-x-2">
                    <label
                      className=" text-gray-700 font-bold mb-2"
                      htmlFor="Name"
                    >
                      Name
                    </label>
                    <input
                      id="name"
                      name="name"
                      type="name"
                      autoComplete="Name"
                      required
                      onChange={handleInputChange}
                      className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                      placeholder={user?.name}
                    />
                  </div>
                  <div className="flex flex-wrap md:flex-nowrap items-center space-x-2">
                    <label className=" text-gray-700 font-bold mb-2">
                      Email:
                    </label>
                    <input
                      type="email"
                      name="email"
                      value={newUserData.email}
                      onChange={handleInputChange}
                      required
                      placeholder={user?.email}
                      className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                    />
                  </div>
                  <button
                    type="submit"
                    className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                  >
                    Update
                  </button>
                </form>
              </div>
            </div>
          )}
          <ProfileCard>
            <div className="space-y-4">
              <h2 className="text-2xl font-semibold">Profile Details</h2>
              <ul className="divide-y divide-gray-200">
                <li className="py-3">
                  <span className="font-medium">Name:</span> {user?.name}
                </li>
                <li className="py-3">
                  <span className="font-medium">Email:</span> {user?.email}
                </li>
                {user?.speciality && (
                  <li className="py-3">
                    <span className="font-medium">Speciality:</span>{" "}
                    {user?.speciality}
                  </li>
                )}
              </ul>
            </div>
          </ProfileCard>
          <ProfileCard>
            <h2 className="text-2xl font-semibold">Settings</h2>
            <button
              onClick={handleNewUserToggle}
              className="bg-blue-500 hover:bg-blue-600 text-white font-bold px-2 py-2 mt-5 rounded-md transition duration-150 ease-in-out flex items-center justify-center space-x-2"
            >
              <span>Update Profile</span>
            </button>

            <button
              onClick={handlePasswordChange}
              className="bg-blue-500 hover:bg-blue-600 text-white font-bold px-2 py-2 mt-5 rounded-md transition duration-150 ease-in-out flex items-center justify-center space-x-2"
            >
              <span>Change Password</span>
            </button>

            <button
              onClick={handleSubscribe}
              className="bg-blue-500 hover:bg-blue-600 text-white font-bold px-2 py-2 mt-5 rounded-md transition duration-150 ease-in-out flex items-center justify-center space-x-2"
            >
              <span>Subscribe to Newsletter</span>
            </button>
          </ProfileCard>
          </>
      )}
    </div>
  );
}

export default Profile;
