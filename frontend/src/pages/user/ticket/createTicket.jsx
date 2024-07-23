import React, { useState } from "react";
import axios from "axios";
import Popup from "../../../components/Popup";
import toast from "react-hot-toast";
const backendURL = import.meta.env.VITE_BACKEND_URL;

const CreateTicket = ({ onTicketCreated }) => {
  const [panelOpen, setPanelOpen] = useState(false);
  const [subject, setSubject] = useState("");
  const [description, setDescription] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    const formData = new FormData(e.target);
    const data = { ...Object.fromEntries(formData.entries()) };
    console.log(data);
    try {
      console.log("ookk");
      const response = await axios.post(
        `${backendURL}/api/v1/user/create-ticket`,
        {...data},
        {
          headers: {
            Authorization: "Bearer " + localStorage.getItem("token"),
          },
        }
      );
      setSubject("");
      setDescription("");
      toast.success("Ticket created successfully");
      setPanelOpen(false);
      if (onTicketCreated) {
        onTicketCreated(response.data.data.ticket);
      }
    } catch (err) {
      toast.error("Some error while creating ticket");
      setError("Failed to create ticket. Please try again.");
      console.error("Error creating ticket:", err);
    }
  };

  function togglePanel() {
    setPanelOpen(!panelOpen);
  }
  return (
    <div className="">
      {panelOpen && (
        <Popup isOpen={panelOpen} onClose={togglePanel}>
          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label
                className="block text-gray-700 text-sm font-bold mb-2"
                htmlFor="subject"
              >
                Subject
              </label>
              <input
                type="text"
                id="subject"
                name="subject"
                value={subject}
                onChange={(e) => setSubject(e.target.value)}
                required
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              />
            </div>
            <div className="mb-4">
              <label
                className="block text-gray-700 text-sm font-bold mb-2"
                htmlFor="description"
              >
                Description
              </label>
              <textarea
                id="description"
                value={description}
                name="description"
                onChange={(e) => setDescription(e.target.value)}
                required
                rows="4"
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              />
            </div>

            <label
              htmlFor="Category"
              className="block text-gray-700  text-sm font-bold mb-2"
            >
              Category
            </label>
            <select
              id="category"
              name="category"
              required
              className="appearance-none rounded-none relative block w-full px-3 py-2 mb-2 border border-gray-300 bg-white text-gray-900  rounded-b-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            >
              <option value="">Choose Category</option>
              <option value="Booking Issue">Booking Issue</option>
              <option value="Technical Problem">Technical Problem</option>
              <option value="General Inquiry">General Inquiry</option>
              <option value="Other">Other</option>
            </select>

            <div className="flex flex-wrap items-center justify-between">
              <button
                type="submit"
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              >
                Create Ticket
              </button>
              <button
                type="button"
                onClick={togglePanel}
                className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              >
                Cancel
              </button>
            </div>
          </form>
        </Popup>
      )}
      <button
        onClick={togglePanel}
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
      >
        Create a new ticket
      </button>
      {error && <p className="text-red-500 mb-4">{error}</p>}
    </div>
  );
};

export default CreateTicket;
