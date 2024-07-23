import React, { useState, useEffect } from "react";
import axios from "axios";
import { CalendarIcon, TagIcon, ClockIcon } from "lucide-react";
import TicketThread from "./ticketThread";
import toast from "react-hot-toast";
const backendURL = import.meta.env.VITE_BACKEND_URL;
const TicketList = ({ tickets, setTickets }) => {
  const [selectedTicketId, setSelectedTicketId] = useState(null);

  const getStatusColor = (status) => {
    switch (status) {
      case "Open":
        return "bg-green-100 text-green-800";
      case "In Progress":
        return "bg-blue-100 text-blue-800";
      case "Awaiting User Response":
        return "bg-yellow-100 text-yellow-800";
      case "Resolved":
        return "bg-purple-100 text-purple-800";
      case "Closed":
        return "bg-gray-100 text-gray-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };
  const handleTicketClick = (ticketId) => {
    setSelectedTicketId(ticketId);
  };

  const handleBackToList = () => {
    setSelectedTicketId(null);
  };

  const handleDelete = async (ticketId) => {
    try {
      const res = await axios.delete(
        `${backendURL}/api/v1/user/ticket/${ticketId}`,
        {
          headers: {
            Authorization: "Bearer " + localStorage.getItem("token"),
          },
        }
      );
      console.log(res.data);
      toast.success("Ticket deleted successfully");
      const newTickets = tickets.filter((ticket) => ticket._id !== ticketId);
      console.log("new", newTickets);
      setTickets(tickets.filter((ticket) => ticket._id !== ticketId));
    } catch (err) {
      toast.error("Some error while deleting ticket");
      console.error("Error deleting ticket:", err);
    }
  };

  if (selectedTicketId) {
    console.log("noe");
    return (
      <TicketThread ticketId={selectedTicketId} onBack={handleBackToList} />
    );
  }
  return (
    <div className="p-4 max-w-4xl mx-auto">
      <h2 className="text-3xl font-bold mb-6 text-gray-800">Your Tickets</h2>
      <div className="space-y-4">
        {tickets?.map((ticket) => (
          <div
            key={ticket._id}
            className="bg-white hover:bg-slate-200 hover:cursor-pointer shadow-md rounded-lg p-6 hover:shadow-lg transition duration-300"
            onClick={() => handleTicketClick(ticket._id)}
          >
            <div className="flex justify-between items-start mb-4">
              <h3 className="font-semibold text-xl text-gray-800">
                {ticket.subject}
              </h3>
              <span
                className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(
                  ticket.status
                )}`}
              >
                {ticket.status}
              </span>
            </div>
            <p className="text-gray-600 mb-4">{ticket.description}</p>
            <div className="flex flex-wrap gap-4 text-sm text-gray-500">
              <div className="flex items-center">
                <TagIcon size={16} className="mr-2" />
                {ticket.category}
              </div>
              <div className="flex items-center">
                <CalendarIcon size={16} className="mr-2" />
                Created: {new Date(ticket.createdAt).toLocaleDateString()}
              </div>
              <div className="flex items-center">
                <ClockIcon size={16} className="mr-2" />
                Updated: {new Date(ticket.updatedAt).toLocaleDateString()}
              </div>
              <i
                className="ri-delete-bin-line ml-auto text-xl hover:text-red-400"
                onClick={(e) => {
                  e.stopPropagation();
                  handleDelete(ticket._id);
                }}
              ></i>
            </div>
            {ticket.resolvedAt && (
              <div className="mt-2 text-sm text-green-600">
                Resolved: {new Date(ticket.resolvedAt).toLocaleDateString()}
              </div>
            )}
            {ticket.closedAt && (
              <div className="mt-2 text-sm text-gray-500">
                Closed: {new Date(ticket.closedAt).toLocaleDateString()}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default TicketList;
