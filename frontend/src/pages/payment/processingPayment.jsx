import React, { useEffect, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import axios from 'axios';
import NotAuthorized from '../notAuthorized';
const backendURL = import.meta.env.VITE_BACKEND_URL;

const ProcessingPaymentPage = () => {
  const [status, setStatus] = useState('processing');
  const navigate = useNavigate();
  const location = useLocation();
  // return <div>working</div>
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
          setTimeout(() => navigate('/appointment-success'), 2000);
        } else if (response.data.status === 'failed') {
          setStatus('failed');
          setTimeout(() => navigate('/appointment-failed'), 2000);
        } else {
          // If still processing, check again after 2 seconds
          setTimeout(checkPaymentStatus, 2000);
        }
      } catch (error) {
        console.error('Error checking payment status:', error);
        setStatus('error');
        setTimeout(() => navigate('/appointment-failed'), 2000);
      }
    };

    checkPaymentStatus();
  }, [navigate, location]);

  return (
    <div className="processing-payment">
      {status === 'processing' && <p>Processing your payment. Please wait...</p>}
      {status === 'success' && <p>Payment successful! Redirecting to confirmation page...</p>}
      {status === 'failed' && <p>Payment failed. Redirecting to error page...</p>}
      {status === 'error' && <p>An error occurred. Redirecting to error page...</p>}
    </div>
  );
};

export default ProcessingPaymentPage;