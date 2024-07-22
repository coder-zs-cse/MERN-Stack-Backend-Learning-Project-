const mongoose = require('mongoose');

const appointmentSchema = new mongoose.Schema({
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'users',
      required: true
    },
    doctorId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'users',
      required: true
    },
    appointmentDateTime: {
      type: Date,
      required: true
    },
    status: {
      type: String,
      enum: ['scheduled', 'completed', 'cancelled'],
      default: 'scheduled'
    },
    transactionInfo: {
      sessionId: String,
      paymentIntentId: String,
      amount: Number,
      currency: String,
      paymentStatus: {
        type: String,
        enum: ['pending', 'succeeded', 'failed'],
        default: 'pending'
      },
      paymentMethod: String
    },
    createdAt: {
      type: Date,
      default: Date.now
    }
  });
  
  const Appointment = mongoose.model('Appointment', appointmentSchema);
  
  module.exports = Appointment;