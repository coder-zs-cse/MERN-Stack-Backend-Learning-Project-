import { GoogleLogin } from "@react-oauth/google";
import { jwtDecode } from "jwt-decode";
import axios from "axios";
import { useNavigate } from "react-router-dom";
const backendURL = import.meta.env.VITE_BACKEND_URL;


const temp = () => {
    const navigate = useNavigate()
    async function handleLoginSuccess(credentialResponse){
      const token = jwtDecode(credentialResponse.credential);
      console.log(token);
      console.log(token.name);
      console.log(token.email);
      const response = await axios.post(`${backendURL}/api/v1/user/auth/google`, {
        token: credentialResponse.credential
      });
      console.log(response.data.data.token);
      localStorage.setItem("token", response.data.data.token);
      navigate('/home')
      // Handle the server response
      // e.g., save user info to state, redirect, etc.
    
    }
    // const googleLogin = useGoogleLogin({
    //   onSuccess: async (response) => {
    //     // Send the access token to your server
    //   onError: (error) => console.log('Login Failed:', error),
    // });
  


    

  console.log("hello");
  return (
    <div className="flex justify-center h-screen items-center">
      <GoogleLogin
        onSuccess={handleLoginSuccess}
        onError={() => {
          console.log("Login Failed");
        }}
      />
      
    </div>
  );
};

export default temp;
