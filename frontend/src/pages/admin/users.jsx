import React from "react";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { useState } from "react";
import { useSelector } from "react-redux";
import axios from "axios";
import UserCard from "../../components/admin/userCard";
const backendURL = import.meta.env.VITE_BACKEND_URL;

function Users() {
  const { user } = useSelector((state) => state.user);
  const [usersList, setUsersList] = useState([]);
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
  useEffect(() => {
    getUsersList();
  }, []);
  return (
    <div className="flex flex-wrap">
      {usersList.map((user) => {
        return <UserCard id={user?.id} name={user?.name} email={user?.email} isAdmin={user?.isAdmin} getUsers={getUsersList}/>;
      })}
    </div>
  );
}

export default Users;
