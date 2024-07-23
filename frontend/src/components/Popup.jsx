import React from "react";

// Popup component
const Popup = ({ isOpen, onClose, children }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full">
      <div className="relative top-20 mx-auto p-5 border w-96 shadow-lg rounded-md bg-white max-w-full">
        <button onClick={onClose} className="float-right font-bold">
        <i className="ri-close-circle-line text-3xl text-red-500 "></i>
        </button>
        {children}
      </div>
    </div>
  );
};

export default Popup;
