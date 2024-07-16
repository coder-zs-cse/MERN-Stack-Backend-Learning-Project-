// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getFirestore } from "@firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCzGfBIvn9OrODClkRD4PUv_yvdpxAcw00",
  authDomain: "onboarding-project-a85c2.firebaseapp.com",
  databaseURL: "https://onboarding-project-a85c2-default-rtdb.firebaseio.com",
  projectId: "onboarding-project-a85c2",
  storageBucket: "onboarding-project-a85c2.appspot.com",
  messagingSenderId: "1084789892219",
  appId: "1:1084789892219:web:a0311d532a3910ac136ede",
  measurementId: "G-JP9TFGY9JX"
};
// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);
export const auth = getAuth(app);
export const provider = new GoogleAuthProvider();

