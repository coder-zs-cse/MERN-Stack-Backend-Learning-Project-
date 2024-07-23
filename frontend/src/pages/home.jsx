import React, { useState, useEffect } from "react";
import axios from 'axios';
import { Link } from 'react-router-dom';
import Loading from '../components/loading';
import { useSelector } from 'react-redux';
const backendURL = import.meta.env.VITE_BACKEND_URL;

function Home() {
    const [upcomingAppointment, setUpcomingAppointment] = useState(null);
    const [loading, setLoading] = useState(true);
    const { user } = useSelector((state) => state.user);
    const [error, setError] = useState(null);

    useEffect(() => {
        fetchUpcomingAppointment();
    }, []);

    const fetchUpcomingAppointment = async () => {
        try {
            const response = await axios.get(
                `${backendURL}/api/v1/user/upcoming-appointment`,
                {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem("token")}`,
                    },
                }
            );
            if (response.data.success) {
                setUpcomingAppointment(response.data.data.appointment);
            }
        } catch (error) {
            console.error('Error fetching upcoming appointment:', error);
            setError('An error occurred while fetching your upcoming appointment');
        } finally {
            setLoading(false);
        }
    };

    if (loading) return <Loading />;
    if (error) return <div className="text-center py-4 text-red-500">Error: {error}</div>;

    return (
        <div className="container mx-auto px-4 py-8 bg-gradient-to-b min-h-screen">
            <h1 className="text-2xl font-bold mb-8 text-center text-blue-700">Welcome to Your Health Dashboard</h1>
            
            {upcomingAppointment ? (
                <div className="bg-white shadow-lg rounded-lg p-8 mb-8 border border-blue-200">
                    <p className="text-2xl font-semibold mb-4 text-indigo-600">Hi {user.name},</p>
                    <h2 className="text-2xl font-bold mb-6 text-blue-600">Your Upcoming Appointment</h2>
                    <div className="space-y-3 text-lg">
                        <p><span className="font-semibold text-gray-700">Doctor:</span> <span className="text-indigo-600">{upcomingAppointment.doctorId.name}</span></p>
                        <p><span className="font-semibold text-gray-700">Specialization:</span> <span className="text-green-600">{upcomingAppointment.doctorId.doctorDetails.designation}</span></p>
                        <p><span className="font-semibold text-gray-700">Date & Time:</span> <span className="text-purple-600">{new Date(upcomingAppointment.appointmentDateTime).toLocaleString()}</span></p>
                        <p><span className="font-semibold text-gray-700">Status:</span> <span className="text-orange-600 font-semibold">{upcomingAppointment.status}</span></p>
                    </div>
                    <Link to="/appointments" className="mt-6 inline-block bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-6 rounded-full transition duration-300 ease-in-out transform hover:-translate-y-1 hover:scale-110">
                        View All Appointments
                    </Link>
                </div>
            ) : (
                <div className="bg-white shadow-lg rounded-lg p-8 mb-8 text-center border border-blue-200">
                    <h2 className="text-3xl font-bold mb-6 text-blue-600">No Upcoming Appointments</h2>
                    <p className="mb-6 text-xl text-gray-600">You don't have any scheduled appointments at the moment.</p>
                    <Link to="/doctors" className="bg-green-500 hover:bg-green-600 text-white font-bold py-3 px-6 rounded-full transition duration-300 ease-in-out transform hover:-translate-y-1 hover:scale-110">
                        Book Your First Appointment
                    </Link>
                </div>
            )}
            
            {/* Additional section for health tips */}
            <div className="bg-white shadow-lg rounded-lg p-8 mb-8 border border-blue-200">
                <h2 className="text-2xl font-bold mb-4 text-blue-600">Health Tip of the Day</h2>
                <p className="text-lg text-gray-700">Remember to stay hydrated! Drinking enough water helps maintain the balance of body fluids, energizes muscles, and keeps your skin looking good.</p>
            </div>
        </div>
    );
}

export { Home };