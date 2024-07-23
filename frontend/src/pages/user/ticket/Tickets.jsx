import React, { useState, useEffect } from 'react';
import axios from 'axios';
import CreateTicket from './createTicket';
import TicketList from './TicketList';
const backendURL = import.meta.env.VITE_BACKEND_URL;

const TicketManagement = () => {
  const [tickets, setTickets] = useState([]);
  console.log("later",tickets);
  useEffect(() => {
    const fetchTickets = async () => {
      try {
        const res = await axios.get(`${backendURL}/api/v1/user/get-tickets`, {
          headers: {
            Authorization: "Bearer " + localStorage.getItem("token"),
          },
        });
        console.log(res.data.data.tickets);
        setTickets(res.data.data.tickets);
      } catch (err) {
        console.error("Error fetching tickets:", err);
      }
    };
    fetchTickets();
  }, []);

  const handleTicketCreated = (newTicket) => {
    setTickets([newTicket, ...tickets]);
  };

  return (
    <div className="container mx-auto px-4">
      <CreateTicket onTicketCreated={handleTicketCreated} />
      <TicketList tickets={tickets} setTickets={setTickets} />
    </div>
  );
};

export default TicketManagement;