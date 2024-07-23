const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Ticket Model
const TicketSchema = new Schema({
  userId: {
    type: Schema.Types.ObjectId,
    ref: 'user',
    required: true
  },
  subject: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  category: {
    type: String,
    enum: ['Booking Issue', 'Technical Problem', 'General Inquiry', 'Other'],
    required: true
  },
  status: {
    type: String,
    enum: ['Open', 'In Progress', 'Awaiting User Response', 'Resolved', 'Closed'],
    default: 'Open'
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  updatedAt: {
    type: Date,
    default: Date.now
  },
  resolvedAt: Date,
  closedAt: Date
});

// TicketReply Model
const TicketReplySchema = new Schema({
  ticket: {
    type: Schema.Types.ObjectId,
    ref: 'Ticket',
    required: true
  },
  user: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  isAdmin: {
    type: Boolean,
    default: false
  },
  message: {
    type: String,
    required: true
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

// Create models
const Ticket = mongoose.model('Ticket', TicketSchema);
const TicketReply = mongoose.model('TicketReply', TicketReplySchema);

module.exports = { Ticket, TicketReply };