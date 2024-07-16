import { auth } from "../firebase-config.js";
import { signInWithPopup } from "firebase/auth";
import { getAuth, signInAnonymously, onAuthStateChanged } from "firebase/auth";
import "../styles/Auth.css";
import Cookies from "universal-cookie";

const cookies = new Cookies();

export const Auth = ({ setIsAuth }) => {
  const signInWithGoogle = async () => {
    try {
      await signInAnonymously(auth);
      // const result = await signInWithPopup(auth, provider);
      // cookies.set("auth-token", result.user.refreshToken);
      onAuthStateChanged(auth, (user) => {
        if (user) {
          // User is signed in, see docs for a list of available properties
          // https://firebase.google.com/docs/reference/js/auth.user
          const uid = user.uid;
          console.log(uid);
          // ...
        } else {
          // User is signed out
          // ...
          console.log("no user");
        }
      });
      setIsAuth(true);
    } catch (err) {
      console.error(err);
    }
  };
  return (
    <div className="auth">
      <p> Sign In With Google To Continue </p>
      <button onClick={signInWithGoogle}> Sign In With Google </button>
    </div>
  );
};
