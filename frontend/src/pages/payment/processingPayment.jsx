import React, { useEffect, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import axios from 'axios';
import toast from 'react-hot-toast';
import Loading from '../../components/loading';
const backendURL = import.meta.env.VITE_BACKEND_URL;

const ProcessingPaymentPage = () => {
  const [status, setStatus] = useState('processing');
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const searchParams = new URLSearchParams(location.search);
    const sessionId = searchParams.get('session_id');
    
    const checkPaymentStatus = async () => {
      try {
        const response = await axios.get(`${backendURL}/api/v1/stripe/payment/status/${sessionId}`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });

        if (response.data.status === 'succeeded') {
          setStatus('success');
          toast.success('Payment successful!');
          toast('Redirecting to appointments page...');
          setTimeout(() => navigate('/appointments'), 2000);
        } else if (response.data.status === 'failed') {
          setStatus('failed');
          toast.error('Payment failed.');
          toast('Redirecting to appointments page...');
          setTimeout(() => navigate('/appointments'), 2000);
        } else {
          setTimeout(checkPaymentStatus, 2000);
        }
      } catch (error) {
        console.error('Error checking payment status:', error);
        setStatus('error');
        // setTimeout(() => navigate('/appointments'), 2000);
      }
    };

    checkPaymentStatus();
  }, [navigate, location]);

  return (
    <div className="flex items-center h-full justify-center bg-gray-100">
        {status === 'processing' && (
          <div className="text-center ">
          <Loading />
            <h2 className="text-2xl font-semibold mb-4 text-green-600">Payment processing</h2>
            <p className="text-gray-600">Wait for some time</p>
          </div>
        )}
        {status === 'success' && (
          <div className="text-center">
            <h2 className="text-2xl font-semibold mb-4 text-green-600">Payment Successful!</h2>
            <p className="text-gray-600">Redirecting to confirmation page...</p>
          </div>
        )}
        {status === 'failed' && (
          <div className="text-center">
            <h2 className="text-2xl font-semibold mb-4 text-red-600">Payment Failed</h2>
            <p className="text-gray-600">Redirecting to error page...</p>
          </div>
        )}
        {status === 'error' && (
          <div className="text-center">
            <h2 className="text-2xl font-semibold mb-4 text-red-600">An Error Occurred</h2>
            <p className="text-gray-600">Redirecting to error page...</p>
          </div>
        )}
    </div>
  );
};

export default ProcessingPaymentPage;