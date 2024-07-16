import React from "react";
import { db, auth } from "../firebase-config";
import { useState, useEffect } from "react";
import Chat from "./Chat";
import { useSelector } from "react-redux";
import { getAuth, signInAnonymously } from "firebase/auth";
import {
  collection,
  addDoc,
  where,
  serverTimestamp,
  onSnapshot,
  query,
  orderBy,
} from "firebase/firestore";

function Assistant(prop) {
  const messagesRef = collection(db, "messages");
  const { userId } = useSelector((state) => state.userId);

  async function sendMessage(message, Id) {
    await addDoc(messagesRef, {
      message,
      createdAt: serverTimestamp(),
      uid: userId,
      senderType: "client",
    });
  }
  function receiveMessages(setMessagesCallback) {
    const queryMessages = query(
      messagesRef,
      where("uid", "==", userId),
      orderBy("createdAt")
    );
    const unsuscribe = onSnapshot(queryMessages, (snapshot) => {
      let allMessages = [];
      snapshot.forEach((doc) => {
        allMessages.push({ ...doc.data(), id: doc.id });
      });
      setMessagesCallback(allMessages);
      console.log("beofr",allMessages);
    });
    return ()=>unsuscribe();
  }
  return (
    <div>
      Assistant this is assistant
      <Chat
        title="Customer Care"
        sendMessage={sendMessage}
        receiveMessages={receiveMessages}
        userId={userId}
        senderType="client"
      />
    </div>
  );
}

export default Assistant;
