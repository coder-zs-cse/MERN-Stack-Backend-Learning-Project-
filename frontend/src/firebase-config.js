import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getFirestore } from "@firebase/firestore";


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
// export const auth = getAuth(app);
export const auth = getAuth()
// export const provider = new GoogleAuthProvider();