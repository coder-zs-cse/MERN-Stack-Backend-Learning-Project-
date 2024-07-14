import React from "react";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { useState } from "react";
import { useSelector } from "react-redux";
import toast from "react-hot-toast";

import axios from "axios";
import UserCard from "../../components/admin/userCard";
const backendURL = import.meta.env.VITE_BACKEND_URL;

function Users() {
  const { user } = useSelector((state) => state.user);
  const [usersList, setUsersList] = useState([]);
  const [showNewUserForm, setShowNewUserForm] = useState(false);
  const [newUserData, setNewUserData] = useState({
    email: "",
    role: "user", // Default role
  });
  const navigate = useNavigate();
  // console.log(user);
  const getUsersList = async () => {
    try {
      const response = await axios.get(
        `${backendURL}/api/v1/admin/get-list-of-users`,
        {
          headers: {
            Authorization: "Bearer " + localStorage.getItem("token"),
          },
        }
      );
      // console.log("response: ",response.data);
      const data = response.data;
      if (data.success) {
        // setIsLoading(false);
        // console.log("mydata: ", data.data);
        setUsersList(data.data);
        console.log("data: ", data.data);
      } else {
        // setIsLoading(false);
        navigate("/home");
      }
    } catch (error) {
      //   setIsLoading(false);
      //   navigate("/");
    }
  };
  const handleNewUserToggle = () => {
    setShowNewUserForm(!showNewUserForm);
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
    try {
      const isAdmin = newUserData.role === "admin" ? true : false;
      const response = await axios.put(
        `${backendURL}/api/v1/admin/new-user/`,
        {
          email: newUserData.email,
          isAdmin
        }
      );
      if (response.data.success) {
        toast.success(response.data.message);
      }
      else{
        toast.error(response.data.message);
      }
      getUsers();
    } catch (error) {
      console.log("Error creating new user");
    }
    // Submit new user logic
    setShowNewUserForm(false); // Close form after submission
    getUsersList();
  };

  useEffect(() => {
    getUsersList();
  }, []);
  return (
    <div>
      <div>
        <button
          onClick={handleNewUserToggle}
          className="bg-blue-500 hover:bg-blue-600 text-white font-bold px-6 py-3 m-2 rounded-md transition duration-150 ease-in-out flex items-center justify-center space-x-2"
        >
          <span>New User</span>
          <i className="ri-add-circle-line align-middle"></i>
        </button>
      </div>
      {showNewUserForm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
          <form
            onSubmit={handleSubmitNewUser}
            className="bg-white p-5  rounded-lg space-y-5 flex flex-col"
          >
            <div>
              <h2  className="text-xl font-bold text-center my-2 text-gray-800">
                New User
              </h2>
            </div>
            <div className="flex flex-wrap md:flex-nowrap items-center space-x-2">
              <label className=" text-gray-700 font-bold mb-2">Email:</label>
              <input
                type="email"
                name="email"
                value={newUserData.email}
                onChange={handleInputChange}
                required
                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
              />
            </div>
            <div>
              <label className=" text-gray-700 font-bold mb-2">Role:</label>
              <select
                name="role"
                value={newUserData.role}
                onChange={handleInputChange}
                className="border-2 border-gray-200 ml-3 p-2 rounded-md bg-white text-gray-700"
              >
                <option value="user">User</option>
                <option value="admin">Admin</option>
              </select>
            </div>
            <button
              type="submit"
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
            >
              Create
            </button>
          </form>
        </div>
      )}
      <div className="flex flex-wrap">
        {usersList.map((currentUser) => {
          if (currentUser.id !== user?.id)
            return (
              <UserCard
                key={currentUser.id}
                id={currentUser.id}
                name={currentUser.name}
                email={currentUser.email}
                isAdmin={currentUser.isAdmin}
                getUsers={getUsersList}
              />
            );
        })}
      </div>
    </div>
  );
}

export default Users;
