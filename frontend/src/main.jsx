import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { Provider } from 'react-redux';
import store from "./redux/store";
import { GoogleOAuthProvider } from '@react-oauth/google';

const client_id = "981380021376-5fp5tf0an3dut819ahrpgclq6uo7vq9h.apps.googleusercontent.com"

ReactDOM.createRoot(document.getElementById("root")).render(
  <Provider store={store}>
    <GoogleOAuthProvider clientId={client_id}>
      <App />
    </GoogleOAuthProvider>
  </Provider>
);
