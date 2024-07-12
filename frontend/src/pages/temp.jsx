import React from "react";
import FacebookLogin from "@greatsumini/react-facebook-login";
const app_id = "996704532146488";
import axios from 'axios'
import { useNavigate } from "react-router-dom";
const backendURL = import.meta.env.VITE_BACKEND_URL;

function temp() {
  const navigate = useNavigate()
  async function handleSubmit(event){
    try {
      const token = event.accessToken;
      const response = await axios.post(`${backendURL}/api/v1/user/auth/facebook`, { token });
      console.log('Backend response:', response.data);
      console.log(response.data.data.token);
      localStorage.setItem("token", response.data.data.token);
      navigate("/home");
      // Handle successful login (e.g., store user data in state, redirect, etc.)
    } catch (error) {

      console.error(`Error sending data to backend`, error);
      // Handle error (e.g., show error message to user)
    }
  }
  return (
    <div className="flex min-h-screen justify-center items-center">
      <FacebookLogin
        appId={app_id}
        style={{
          backgroundColor: "#4267b2",
          color: "#fff",
          fontSize: "16px",
          padding: "12px 24px",
          border: "none",
          borderRadius: "4px",
        }}
        onSuccess={handleSubmit}
        onFail={(error) => {
          console.log("Login Failed!", error);
        }}
        onProfileSuccess={(response) => {
          console.log("Get Profile Success!", response);
        }}
      />
    </div>
  );
}

export default temp;
// default

// // custom style
// <FacebookLogin
//   appId="1088597931155576"
//   style={{
//     backgroundColor: "#4267b2",
//     color: "#fff",
//     fontSize: "16px",
//     padding: "12px 24px",
//     border: "none",
//     borderRadius: "4px",
//   }}
// />;

// // custom render function
// <FacebookLogin
//   appId="1088597931155576"
//   onSuccess={(response) => {
//     console.log('Login Success!', response);
//   }}
//   onFail={(error) => {
//     console.log('Login Failed!', error);
//   }}
//   onProfileSuccess={(response) => {
//     console.log('Get Profile Success!', response);
//   }}
//   render={({ onClick, logout }) => (
//     <CustomComponent onClick={onClick} onLogoutClick={logout} />
//   )}
// />

// // custom params, options
// <FacebookLogin
//   appId="1088597931155576"
//   useRedirect
//   initParams={{
//     version: 'v10.0',
//     xfbml: true,
//   }}
//   dialogParams={{
//     response_type: 'token',
//   }}
//   loginOptions={{
//     return_scopes: true,
//   }}
// />
