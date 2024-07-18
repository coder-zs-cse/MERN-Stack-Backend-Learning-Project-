import React, { useState, useEffect } from "react";
import { db } from "../firebase-config";
import Chat from "./Chat";
import { useSelector } from "react-redux";
import {
  collection,
  addDoc,
  where,
  serverTimestamp,
  onSnapshot,
  query,
  orderBy,
} from "firebase/firestore";

function Assistant({ role, queryUid, title }) {
  const messagesRef = collection(db, "messages");
  const [chatUid, setChatUid] = useState("");
  const { anonymousUserId } = useSelector((state) => state.anonymousUserId);
  
  async function sendMessage(message) {
    console.log("queryidassi", anonymousUserId);
    const uidChat = role === 'admin' ? queryUid : anonymousUserId; 
    await addDoc(messagesRef, {
      message,
      createdAt: serverTimestamp(),
      uid: uidChat,
      senderType: role,
    });
  }

  function receiveMessages(setMessagesCallback) {
    const uidForQuery = role === 'admin' ? queryUid : anonymousUserId; 
    console.log("uidForQuery", uidForQuery);
    const queryMessages = query(
      messagesRef,
      where("uid", "==", uidForQuery),
      orderBy("createdAt")
    );
    const unsubscribe = onSnapshot(queryMessages, (snapshot) => {
      let allMessages = [];
      snapshot.forEach((doc) => {
        allMessages.push({ ...doc.data(), id: doc.id });
      });
      setMessagesCallback(allMessages);
    });
    return () => unsubscribe();
  }

  useEffect(() => {
    setChatUid(queryUid);
  }, [queryUid]);

  return (
    <div>
      <Chat
        title={title}
        sendMessage={sendMessage}
        receiveMessages={receiveMessages}
        anonymousUserId={chatUid} 
        role={role}
      />
    </div>
  );
}

export default Assistant;