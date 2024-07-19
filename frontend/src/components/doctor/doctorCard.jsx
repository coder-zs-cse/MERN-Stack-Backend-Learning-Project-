import React from "react";
import { useNavigate } from "react-router-dom";

const DoctorCard = ({ doctor }) => {
  const doctorDetails = doctor.doctorDetails;
  const navigate = useNavigate()
  return (
    <div >
      <div className="max-w-sm rounded overflow-hidden shadow-lg bg-white pt-6 px-6 mx-2 hover:bg-gray-300">
        <h2 className="font-bold text-xl mb-2 text-gray-800">{doctor.name}</h2>
        <p className="text-gray-700 text-base mb-2">
          <span className="font-semibold">{doctorDetails.designation}</span> 
          {doctorDetails.experience && <>• {doctorDetails.experience} years experience</>} 
        </p>
        <p className="text-gray-600 text-sm mb-2">
          Clinic: {doctorDetails.clinicName}
        </p>
        <p className="text-green-600 font-semibold mb-4">
          Consultation Fee: ₹{doctorDetails.costOfCharge}
        </p>
        <div className="mb-4">
          <p className="font-semibold text-gray-700 mb-1">
            Timings: {doctorDetails.timings}
          </p>
        </div>
        <div className="flex justify-center my-2">
          <button
            type="button"
            onClick={() => {
              navigate(`/doctors/${doctor._id}`);
            }}
            className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded transition duration-300 ease-in-out"
          >
            Book a Consultation
          </button>
        </div>
      </div>
    </div>
  );
};
export default DoctorCard;
// const App = () => {
//   const doctorInfo = {
//     clinicName: "New York Medical Center",
//     costOfCharge: 150,
//     designation: "Cardiologist",
//     experience: 10,
//     timings: {weekdays: '9:00 AM - 5:00 PM', saturday: '10:00 AM - 2:00 PM'},
//     email: "zubinshah@nitgoa.ac.in",
//     name: "Dr. John Doe"
//   };

//   return (
//     <div className="flex justify-center items-center min-h-screen bg-gray-100">
//       <DoctorCard doctor={doctorInfo} />
//     </div>
//   );
// };

// export default App;
