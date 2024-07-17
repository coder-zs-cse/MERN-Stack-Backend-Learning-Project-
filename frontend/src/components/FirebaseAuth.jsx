import React, { useContext } from "react";
import Loading from "./loading";
import { useState, useEffect } from "react";
import { auth } from "../firebase-config";
import { useSelector, useDispatch } from "react-redux";
import { setanonymousUserId } from "../redux/userSlice";
import { onAuthStateChanged, signInAnonymously, signOut } from "firebase/auth";

function Auth(props) {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(true);
  const { anonymousUserId } = useSelector((state) => state.anonymousUserId);
  async function anonymousSignIn(forceNew = false) {
    setLoading(true);
    try {
      if (forceNew) {
        await signOut(auth);
      }
      await signInAnonymously(auth);
      const unsubscribe = onAuthStateChanged(auth, (user) => {
        if (user) {
          const uid = user.uid;
          console.log("this is it",uid);
          // setUser(uid);
          dispatch(setanonymousUserId(uid));
        } else {
          console.log("no user");
        }
        setLoading(false);
        // unsubscribe(); // Unsubscribe after first call
      });
    } catch (error) {
      console.error("Error signing in anonymously:", error);
      setLoading(false);
    }
  }

  useEffect(() => {
    anonymousSignIn();
  }, []);

  const handleNewUserId = () => {
    anonymousSignIn(true);
  };

  return (
    <div>
      {loading ? (
        <Loading />
      ) : (
        <>
          {props.children}

          <button
            onClick={handleNewUserId}
            className="mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
          >
            Get New User ID
          </button>
          <p>Current User ID: {anonymousUserId}</p>
        </>
      )}
    </div>
  );
}
 
export default Auth;
