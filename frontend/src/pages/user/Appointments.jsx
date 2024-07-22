import React, { useState, useEffect } from 'react';
import axios from 'axios';
const backendURL = import.meta.env.VITE_BACKEND_URL;

const Appointments = () => {
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchAppointments();
  }, []);

  const fetchAppointments = async () => {
    try {
      const response = await axios.get(
        `${backendURL}/api/v1/user/my-appointments`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      if (response.data.success) {
        console.log("appointments",response.data.data.appointments);
        setAppointments(response.data.data.appointments);
      } else {
        setError('Failed to fetch appointments');
      }
    } catch (error) {
      console.error('Error fetching appointments:', error);
      setError('An error occurred while fetching appointments');
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <div>Loading appointments...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div className="user-appointments">
      <h2>Your Appointments</h2>
      {appointments.length === 0 ? (
        <p>You have no appointments scheduled.</p>
      ) : (
        <ul>
          {appointments.map((appointment) => (
            <li key={appointment._id}>
              <h3>Appointment with Dr. {appointment.doctorId.name}</h3>
              <p>Specialization: {appointment.doctorId.doctorDetails.designation}</p>
              <p>Date & Time: {new Date(appointment.appointmentDateTime).toLocaleString()}</p>
              <p>Status: {appointment.status}</p>
              <h4>Payment Information:</h4>
              <p>Amount: {appointment.transactionInfo.amount} {appointment.transactionInfo.currency.toUpperCase()}</p>
              <p>Payment Status: {appointment.transactionInfo.paymentStatus}</p>
              {appointment.transactionInfo.paymentMethod && (
                <p>Payment Method: {appointment.transactionInfo.paymentMethod}</p>
              )}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default Appointments;