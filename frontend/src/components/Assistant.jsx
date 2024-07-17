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
  const [chatUid, setChatUid]= useState("");
  const { anonymousUserId } = useSelector((state) => state.anonymousUserId);
  
  async function sendMessage(message) {
    console.log("queryidassi",anonymousUserId);
    const uidChat = prop.role === 'admin' ? prop.queryUid : anonymousUserId; 
    await addDoc(messagesRef, {
      message,
      createdAt: serverTimestamp(),
      uid: uidChat,
      senderType: prop.role,
    });
  }
  function receiveMessages(setMessagesCallback) {
    const uidForQuery = prop.role === 'admin' ? prop.queryUid : anonymousUserId; 
    console.log("uidForQuery",uidForQuery);
    const queryMessages = query(
      messagesRef,
      where("uid", "==", uidForQuery),
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
  useEffect(() => {
    setChatUid(prop.queryUid);
  }, [prop.queryUid]);
  return (
    <div>
      <Chat
        title={prop.title}
        sendMessage={sendMessage}
        receiveMessages={receiveMessages}
        anonymousUserId={chatUid} 
        role= {prop.role}
      />
    </div>
  );
}

export default Assistant;
