import React, { useEffect, useState } from "react";
import DoctorCard from "../../components/doctor/doctorCard";
import axios from "axios";
import Loading from "../../components/loading";

const backendURL = import.meta.env.VITE_BACKEND_URL;

function DoctorList() {
  const [doctorList, setDoctorList] = useState([]);
  const [loading, setLoading] = useState(false);
  const getDoctors = async () => {
    setLoading(true);
    try {
      const response = await axios.get(
        `${backendURL}/api/v1/user/list-of-doctors`,
        {
          headers: {
            Authorization: "Bearer " + localStorage.getItem("token"),
          },
        }
      );
      setDoctorList(response.data.data);
    } catch (error) {
      console.log(error);
    }
    setLoading(false);
  };
  useEffect(() => {
    getDoctors();
  }, []);
  return (
    <>
      {loading ? (
        <Loading />
      ) : (
        <div className="flex flex-wrap min-h-screen bg-white pt-2 ">
          {doctorList.map((doctor, index) => (
            <DoctorCard key={index} doctor={doctor} />
          ))}
        </div>
      )}
    </>
  );
}

export default DoctorList;
