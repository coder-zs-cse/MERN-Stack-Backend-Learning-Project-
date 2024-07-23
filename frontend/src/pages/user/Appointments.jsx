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
        console.log("appointments", response.data.data.appointments);
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

  if (loading) return <div className="text-center py-4">Loading appointments...</div>;
  if (error) return <div className="text-center py-4 text-red-500">Error: {error}</div>;

  return (
    <div className="container mx-auto px-4 py-8">
      <h2 className="text-2xl font-bold mb-6 text-center">Your Appointments</h2>
      {appointments.length === 0 ? (
        <p className="text-center">You have no booked appointments.</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white shadow-md rounded-lg overflow-hidden">
            <thead className="bg-gray-200">
              <tr>
                <th className="py-3 px-4 text-left">Doctor</th>
                <th className="py-3 px-4 text-left">Specialization</th>
                <th className="py-3 px-4 text-left">Date & Time</th>
                <th className="py-3 px-4 text-left">Status</th>
                <th className="py-3 px-4 text-left">Amount</th>
                <th className="py-3 px-4 text-left">Payment Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {appointments.map((appointment) => (
                <tr key={appointment._id} className="hover:bg-gray-50">
                  <td className="py-4 px-4">{appointment.doctorId.name}</td>
                  <td className="py-4 px-4">{appointment.doctorId.doctorDetails.designation}</td>
                  <td className="py-4 px-4">{new Date(appointment.appointmentDateTime).toLocaleString()}</td>
                  <td className="py-4 px-4">{appointment.status}</td>
                  <td className="py-4 px-4">
                    {appointment.transactionInfo.amount} {appointment.transactionInfo.currency.toUpperCase()}
                  </td>
                  <td className="py-4 px-4">{appointment.transactionInfo.paymentStatus}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default Appointments;