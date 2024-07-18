import React, { useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { useSelector } from "react-redux";
const backendURL = import.meta.env.VITE_BACKEND_URL;
import { setUser } from "../../../redux/userSlice";
import { useDispatch } from "react-redux";
// Mock function to update doctor details (replace with actual API call)


const EditDoctorProfileForm = ({ doctorDetails, onEditToggle }) => {
  const dispatch = useDispatch();
  const [formDetails, setFormDetails] = useState(doctorDetails);
  const { user } = useSelector((state) => state.user);
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormDetails((prevDetails) => ({ ...prevDetails, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.put(
        `${backendURL}/api/v1/doctor/update-doctor-profile`,
        {
          ...formDetails,
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
    onEditToggle();
  };

  return (
    <div className="max-w-3xl mr-auto px-4 py-8">
      <div className="bg-white shadow-lg rounded-lg overflow-hidden">
        <form onSubmit={handleSubmit} className="p-6">
          <h1 className="text-2xl font-bold text-gray-800 mb-6">
            Edit Doctor Profile
          </h1>
          <div className="space-y-2">
            <InputField
              label="Name"
              name="name"
              value={formDetails.name}
              onChange={handleChange}
            />
            <InputField
              label="Designation"
              name="designation"
              value={formDetails.designation}
              onChange={handleChange}
            />
            <InputField
              label="Years of Experience"
              name="experience"
              type="number"
              value={formDetails.experience}
              onChange={handleChange}
            />
            <InputField
              label="Clinic/Hospital Name"
              name="clinicName"
              value={formDetails.clinicName}
              onChange={handleChange}
            />
            <InputField
              label="Cost of Charge ($)"
              name="costOfCharge"
              type="number"
              value={formDetails.costOfCharge}
              onChange={handleChange}
            />
            <InputField
              label="Mon-Fri Timings"
              name="timings"
              value={formDetails.timings}
              onChange={handleChange}
            />
          </div>
          <div className="mt-6 flex justify-end space-x-3">
            <button
              type="button"
              onClick={onEditToggle}
              className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded transition duration-300 ease-in-out"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded transition duration-300 ease-in-out"
            >
              Update Profile
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

const InputField = ({ label, name, type = "text", value, onChange }) => (
  <div className="bg-gray-50 p-4 rounded-lg">
    <label
      htmlFor={name}
      className="block text-sm font-semibold text-gray-600 mb-1"
    >
      {label}
    </label>
    <input
      type={type}
      name={name}
      id={name}
      value={value || ""}
      onChange={onChange}
      className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
    />
  </div>
);

export default EditDoctorProfileForm;
