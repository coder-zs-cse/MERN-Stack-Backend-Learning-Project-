import React, { useState, useEffect } from 'react';
import axios from 'axios';
import * as XLSX from 'xlsx';
import { saveAs } from 'file-saver';
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

  const getRowColorClass = (status) => {
    switch (status.toLowerCase()) {
      case 'cancelled':
        return 'bg-red-100 hover:bg-red-200';
      case 'scheduled':
        return 'bg-green-100 hover:bg-green-200';
      case 'initiated':
        return 'bg-yellow-100 hover:bg-yellow-200';
      default:
        return 'hover:bg-gray-50';
    }
  };

  const exportToExcel = () => {
    const fileType = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8';
    const fileExtension = '.xlsx';

    const ws = XLSX.utils.json_to_sheet(appointments.map(appointment => ({
      Doctor: appointment.doctorId.name,
      Specialization: appointment.doctorId.doctorDetails.designation,
      'Date & Time': new Date(appointment.appointmentDateTime).toLocaleString(),
      Status: appointment.status,
      Amount: `${appointment.transactionInfo.amount} ${appointment.transactionInfo.currency.toUpperCase()}`,
      'Payment Status': appointment.transactionInfo.paymentStatus
    })));

    const wb = { Sheets: { 'data': ws }, SheetNames: ['data'] };
    const excelBuffer = XLSX.write(wb, { bookType: 'xlsx', type: 'array' });
    const data = new Blob([excelBuffer], {type: fileType});
    saveAs(data, "appointments" + fileExtension);
  };

  if (loading) return <div className="text-center py-4">Loading appointments...</div>;
  if (error) return <div className="text-center py-4 text-red-500">Error: {error}</div>;

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold">Your Appointments</h2>
        <button 
          onClick={exportToExcel} 
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        >
          Export to Excel
        </button>
      </div>
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
                <tr 
                  key={appointment._id} 
                  className={getRowColorClass(appointment.status)}
                >
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