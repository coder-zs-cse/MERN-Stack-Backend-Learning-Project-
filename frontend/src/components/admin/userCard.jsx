import React, { useState } from "react";
import axios from "axios";
const backendURL = import.meta.env.VITE_BACKEND_URL;
import toast from "react-hot-toast";

function UserCard({ id, name, email, isAdmin, getUsers }) {
  const [showActions, setShowActions] = useState(false);
  const [actionMode, setActionMode] = useState(false);

  async function handleDelete(id) {
    // Add code to delete the user

    try {
      const response = await axios.delete(
        `${backendURL}/api/v1/admin/delete-user/${id}`
      );
      if (response.data.success) {
        toast.success(response.data.message);
      }
      getUsers();
    } catch (error) {
      console.log("Error deleting user");
    }
  }
  return (
    <div
      className={`flex flex-col sm:w-64 w-full rounded overflow-hidden shadow-lg p-4 m-4 ${
        actionMode ? "bg-blue-100" : ""
      }`}
    >
      <div className="px-6 py-4 flex-grow">
        <div className="font-bold text-xl mb-2">{name}</div>
        <p className="text-gray-700 text-base">Email: {email}</p>
        <p className="text-gray-700 text-base">
          Role: {isAdmin ? "Admin" : "User"}
        </p>
      </div>
      <div>
        {actionMode && (
          <div className="flex justify-center items-end top-0 left-0 p-2 px-6">
            <button
              className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-1 px-2 rounded"
              onClick={() => {
                setActionMode(false);
                setShowActions(false);
              }}
            >
              Go Back
            </button>
          </div>
        )}
        {!actionMode && (
          <div className="px-6 pt-4 pb-2 bottom-0 flex justify-center">
            <button
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
              onClick={() => {
                setShowActions(!showActions);
                setActionMode(true);
              }}
            >
              Take Action
            </button>
          </div>
        )}
        {showActions && actionMode && (
          <div className="flex justify-center items-center space-x-4 mt-2">
            <button
              onClick={() => handleDelete(id)}
              className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
            >
              Delete
            </button>
            <button className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded">
              {isAdmin ? "Demote" : "Set Admin"}
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

export default UserCard;
