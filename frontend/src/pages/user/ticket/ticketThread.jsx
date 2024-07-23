import React, { useState, useEffect } from "react";
import axios from "axios";
import { ArrowLeft, Send } from "lucide-react";

const backendURL = import.meta.env.VITE_BACKEND_URL;

const TicketThread = ({ ticketId, onBack }) => {
  const [ticket, setTicket] = useState(null);
  const [replies, setReplies] = useState([]);
  const [newReply, setNewReply] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchTicketThread = async () => {
      try {
        const response = axios.get(
          `${backendURL}/api/v1/user/ticket/${ticketId}/replies`,
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );
        console.log(response.data);
        // setTicket(ticketRes.data);
        // setReplies(repliesRes.data);
      } catch (err) {
        console.error("Error fetching ticket thread:", err);
        setError("Failed to load ticket thread. Please try again.");
      } finally {
        setLoading(false);
      }
    };

    fetchTicketThread();
  }, [ticketId]);

  const handleSubmitReply = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(
        `${backendURL}/api/v1/user/ticket/${ticketId}/reply`,
        { message: newReply },
        {
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
        }
      );
      setReplies([...replies, res.data]);
      setNewReply("");
    } catch (err) {
      console.error("Error submitting reply:", err);
      setError("Failed to submit reply. Please try again.");
    }
  };

  if (loading) return <div className="text-center mt-8">Loading...</div>;
  if (error)
    return <div className="text-red-500 text-center mt-8">{error}</div>;
  if (!ticket) return <div className="text-center mt-8">Ticket not found.</div>;

  return (
    <div className="max-w-4xl mx-auto p-4">
      <button
        onClick={onBack}
        className="mb-4 flex items-center text-blue-600 hover:text-blue-800"
      >
        <ArrowLeft size={20} className="mr-2" />
        Back to Tickets
      </button>

      <div className="bg-white shadow-md rounded-lg p-6 mb-6">
        <h2 className="text-2xl font-bold mb-2">{ticket.subject}</h2>
        <p className="text-gray-600 mb-4">{ticket.description}</p>
        <div className="flex flex-wrap gap-4 text-sm text-gray-500">
          <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded">
            {ticket.category}
          </span>
          <span>Status: {ticket.status}</span>
          <span>Created: {new Date(ticket.createdAt).toLocaleString()}</span>
        </div>
      </div>

      <div className="space-y-4 mb-6">
        {replies.map((reply) => (
          <div
            key={reply._id}
            className={`p-4 rounded-lg ${
              reply.isAdmin ? "bg-gray-100" : "bg-blue-100"
            }`}
          >
            <div className="font-semibold mb-2">
              {reply.isAdmin ? "Support Agent" : "You"}
            </div>
            <p>{reply.message}</p>
            <div className="text-xs text-gray-500 mt-2">
              {new Date(reply.createdAt).toLocaleString()}
            </div>
          </div>
        ))}
      </div>

      <form onSubmit={handleSubmitReply} className="mt-4">
        <textarea
          value={newReply}
          onChange={(e) => setNewReply(e.target.value)}
          placeholder="Type your reply here..."
          className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          rows="3"
          required
        />
        <button
          type="submit"
          className="mt-2 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-lg flex items-center"
        >
          <Send size={20} className="mr-2" />
          Send Reply
        </button>
      </form>
    </div>
  );
};

export default TicketThread;
