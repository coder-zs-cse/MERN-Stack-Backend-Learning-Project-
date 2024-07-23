const mongoose = require("mongoose");
const cron = require('node-cron');

const appointmentSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "users",
    required: true,
  },
  doctorId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "users",
    required: true,
  },
  appointmentDateTime: {
    type: Date,
    required: true,
  },
  status: {
    type: String,
    enum: ["scheduled", "completed", "cancelled"],
    default: "scheduled",
  },
  transactionInfo: {
    sessionId: String,
    paymentIntentId: String,
    amount: Number,
    currency: String,
    paymentInitiatedAt: Date,
    paymentStatus: {
      type: String,
      enum: ["pending", "succeeded", "failed"],
      default: "pending",
    },
    paymentMethod: String,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const Appointment = mongoose.model("Appointment", appointmentSchema);



cron.schedule('*/10 * * * * *', processPayments);

module.exports = Appointment;










async function processPayments () {
  // console.log("Cron in action");
  const pendingPayments = await Appointment.find({
    'transactionInfo.paymentStatus': 'pending'
  });

  for (const appointment of pendingPayments) {
    const paymentInitiatedAt = appointment.transactionInfo.paymentInitiatedAt;
    const currentTime = new Date();
    const timeDifference = currentTime - paymentInitiatedAt;
    const timeoutThreshold =  60 * 1000; // 10 minutes

    console.log('Processing payment for appointment:', appointment._id, 'Time difference:', timeDifference);

    if (timeDifference > timeoutThreshold) {
      appointment.transactionInfo.paymentStatus = 'failed';
      appointment.status = 'cancelled';
      await appointment.save();
      // Optionally, trigger a notification to the user here
    }
  }
};
