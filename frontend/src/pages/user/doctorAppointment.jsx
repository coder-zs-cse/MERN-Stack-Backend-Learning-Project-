import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import axios from "axios";
import Popup from "../../components/Popup";

const backendURL = import.meta.env.VITE_BACKEND_URL;

const DoctorAppointment = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [doctor, setDoctor] = useState({});
  const [showBookingForm, setShowBookingForm] = useState(false);
  const [bookingDetails, setBookingDetails] = useState({
    patientName: "",
    healthIssue: "",
    appointmentDateTime: new Date(),
  });

  const fetchDoctorDetails = async () => {
    try {
      const response = await axios.get(
        `${backendURL}/api/v1/user/doctor-detail-by-id/${id}`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      setDoctor(response.data.data);
    } catch (error) {
      console.log(error);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setBookingDetails((prev) => ({ ...prev, [name]: value }));
  };

  const handleDateChange = (date) => {
    setBookingDetails((prev) => ({ ...prev, appointmentDateTime: date }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Create a checkout session
      const response = await axios.post(
        `${backendURL}/api/v1/stripe/create-payment-session`,
        {
          doctorId: id,
          doctorName: doctor.name,
          doctorFee: doctor.doctorDetails.costOfCharge,
          appointmentDetails: bookingDetails,
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      if (response.data.success) {
        window.location.href = response.data.url;
      }
      // Redirect to Stripe Checkout
      // navigate()
    } catch (error) {
      console.error("Error creating checkout session:", error);
    }
  };

  useEffect(() => {
    fetchDoctorDetails();
  }, []);

  return (
    <div className="container mr-auto p-4">
      <div className="bg-white shadow-lg rounded-lg p-6 flex justify-around flex-wrap">
        <div className="flex items-center pl-5">
          <img
            src="/doctor.jpg"
            alt="Doctor"
            className="rounded-full object-cover h-44 mx-auto"
          />
        </div>
        <div className="">
          <h1 className="text-2xl font-bold mb-4">{doctor?.name}</h1>
          <p className="mb-2">
            <span className="font-semibold">Designation:</span>{" "}
            {doctor?.doctorDetails?.designation}
          </p>
          <p className="mb-2">
            <span className="font-semibold">Experience:</span>{" "}
            {doctor?.doctorDetails?.experience} years
          </p>
          <p className="mb-2">
            <span className="font-semibold">Clinic:</span>{" "}
            {doctor?.doctorDetails?.clinicName}
          </p>
          <p className="mb-2">
            <span className="font-semibold">Consultation Fee:</span> ₹
            {doctor?.doctorDetails?.costOfCharge}
          </p>
          <p className="mb-2">
            <span className="font-semibold">Timings:</span>{" "}
            {doctor?.doctorDetails?.timings}
          </p>
          <p className="mb-4">
            <span className="font-semibold">Email:</span> {doctor?.email}
          </p>

          <button
            onClick={() => setShowBookingForm(true)}
            className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded"
          >
            Book an Appointment
          </button>
        </div>
      </div>
      {showBookingForm && (
        <Popup
          isOpen={showBookingForm}
          onClose={() => setShowBookingForm(false)}
        >
              <h3 className="text-lg font-bold mb-4">Book an Appointment</h3>
              <form onSubmit={handleSubmit}>
                <div className="mb-4">
                  <label
                    className="block text-gray-700 text-sm font-bold mb-2"
                    htmlFor="patientName"
                  >
                    Patient Name
                  </label>
                  <input
                    type="text"
                    id="patientName"
                    name="patientName"
                    value={bookingDetails.patientName}
                    onChange={handleInputChange}
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    required
                  />
                </div>
                <div className="mb-4">
                  <label
                    className="block text-gray-700 text-sm font-bold mb-2"
                    htmlFor="healthIssue"
                  >
                    Health Issue
                  </label>
                  <textarea
                    id="healthIssue"
                    name="healthIssue"
                    value={bookingDetails.healthIssue}
                    onChange={handleInputChange}
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    required
                  />
                </div>
                <div className="mb-4">
                  <label
                    className="block text-gray-700 text-sm font-bold mb-2"
                    htmlFor="appointmentDateTime"
                  >
                    Appointment Date and Time
                  </label>
                  <DatePicker
                    selected={bookingDetails.appointmentDateTime}
                    onChange={handleDateChange}
                    showTimeSelect
                    dateFormat="MMMM d, yyyy h:mm aa"
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  />
                </div>
                <div className="flex flex-wrap items-center justify-between">
                  <button
                    type="submit"
                    className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                  >
                    Proceed to Payment
                  </button>
                  <button
                    type="button"
                    onClick={() => setShowBookingForm(false)}
                    className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                  >
                    Cancel
                  </button>
                </div>
              </form>
           
        </Popup>
      )}
    </div>
  );
};

export default DoctorAppointment;
