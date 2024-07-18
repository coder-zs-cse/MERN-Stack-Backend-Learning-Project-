import React, { useState, useEffect } from "react";
import EditDoctorProfileForm from "./EditDoctorProfileForm";
import { useSelector } from "react-redux";

// Mock function to fetch doctor details (replace with actual API call)

const DoctorProfile = () => {
  const [doctorDetails, setDoctorDetails] = useState({});
  const [isEditing, setIsEditing] = useState(false);
  const { user } = useSelector((state) => state.user);

  const fetchDoctorDetails = () => {
    const doctorDetails = {
      name: user.name,
      ...user.doctorDetails,
    }
    setDoctorDetails(doctorDetails);
  };
  useEffect(() => {
    fetchDoctorDetails();
  }, [user]);

  const handleEditToggle = () => setIsEditing(!isEditing);

  if (isEditing) {
    return (
      <EditDoctorProfileForm
        doctorDetails={doctorDetails}
        onEditToggle={handleEditToggle}
      />
    );
  }

  return (
    <div className="container mr-auto pl-2 pt-2">
      <div className="bg-white shadow-xl rounded-lg overflow-hidden">
        <div className="p-2 md:p-4">
          <h1 className="text-2xl font-bold text-gray-800 mb-2">
            Doctor Profile
          </h1>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-4 gap-y-4">
            <ProfileItem label="Name" value={doctorDetails.name} />
            <ProfileItem
              label="Designation"
              value={doctorDetails.designation}
            />
            <ProfileItem
              label="Years of Experience"
              value={doctorDetails.experience}
            />
            <ProfileItem
              label="Clinic/Hospital Name"
              value={doctorDetails.clinicName}
            />
            <ProfileItem
              label="Cost of Charge ($)"
              value={doctorDetails.costOfCharge}
            />
            <ProfileItem
              label="Timings"
              value={doctorDetails.timings}
            />
          </div>
        </div>
        <div className="px-6 md:px-8 pb-2 md:pb-4">
          <button
            onClick={handleEditToggle}
            className="w-full bg-blue-500 hover:bg-blue-600 text-white font-bold py-3 px-4 rounded-lg transition duration-300 ease-in-out"
          >
            Edit Profile
          </button>
        </div>
      </div>
    </div>
  );
};

const ProfileItem = ({ label, value }) => (
  <div className="bg-gray-50 p-3 rounded-lg">
    <h3 className="text-sm font-semibold text-gray-600 mb-1">{label}</h3>
    <p className="text-lg text-gray-800">{value || "Not Set"}</p>
  </div>
);

export default DoctorProfile;
