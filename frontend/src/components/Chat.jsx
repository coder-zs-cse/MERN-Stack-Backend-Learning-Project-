import React from "react";
import { useState, useEffect, useRef } from "react";
import { useSelector } from "react-redux";

function SearchBar({ sendMessage }) {
  const inputRef = useRef(null);
  function handleSubmit(event) {
    event.preventDefault();
    const message = inputRef.current.value.trim();
    if (message === "") return;
    if (sendMessage) sendMessage(message);
    inputRef.current.value = "";
  }

  return (
    <div className="border-t-2 border-gray-200 px-4 pt-4 mb-2 sm:mb-0">
      <div className="relative flex">
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Write your message!"
            ref={inputRef}
            className="w-full focus:outline-none focus:placeholder-gray-400 text-gray-600 placeholder-gray-600 pl-5 bg-gray-200 rounded-full py-3"
          />
          <div className="absolute right-0 items-center inset-y-0 hidden sm:flex">
            <button
              type="submit"
              className="inline-flex items-center justify-center rounded-full h-12 w-12 transition duration-500 ease-in-out text-white bg-blue-500 hover:bg-blue-400 focus:outline-none"
            >
              <svg
                className="w-6 h-6 transform rotate-90 -mr-px"
                fill="none"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path d="M5 12h14M12 5l7 7-7 7"></path>
              </svg>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

function ChatWidget({ receiveMessages, sendMessage, anonymousUserId, role }) {
  const [messages, setMessages] = useState([]);
  function AddBubble({ message, senderType }) {
    console.log("senderType",senderType,role);
    const isSent = (role === "client" && senderType === "client") || (role === "admin" && senderType === "admin");
    return isSent ? <SentBubble message={message} /> : <ReceivedBubble message={message} />;
  }

  useEffect(() => {
    receiveMessages(setMessages);
  }, [anonymousUserId]);

  return (
    <div className="flex flex-col bg-white w-72 fixed right-2 bottom-4 border p-2 rounded-md">
      <div className="bg-blue-500 text-white text-lg flex justify-center font-semibold p-2 rounded-t-md">
        Customer Care
      </div>
      <MessagesFrame>
        <AddBubble
          key="0"
          message="Hello, how can I help you?"
          senderType="admin"
        />
        {messages.map((message, index) => (
          <AddBubble
            key={index}
            message={message.message}
            senderType={message.senderType}
          />
        ))}
      </MessagesFrame>
      <SearchBar sendMessage={sendMessage} />
    </div>
  );
}

export default ChatWidget;

function SentBubble({ message }) {
  return (
    <div
      style={{ maxWidth: "80%" }}
      className="bg-blue-500 text-white px-4 py-2 rounded-lg float-right clear-both"
    >
      {message}
    </div>
  );
}

function MessagesFrame({ children }) {
  return (
    <div className="flex-1 max-h-[calc(100vh-200px)]  overflow-y-auto p-4 space-y-2">
      {children}
    </div>
  );
}

function ReceivedBubble({ message }) {
  return (
    <div
      style={{ maxWidth: "80%" }}
      className="bg-gray-300 max-w-xs lg:max-w-md px-4 py-2 rounded-lg float-left clear-both"
    >
      {message}
    </div>
  );
}