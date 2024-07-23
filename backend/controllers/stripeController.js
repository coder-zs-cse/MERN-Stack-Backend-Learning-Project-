const User = require("../models/userModel");
const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);
const Appointment = require('../models/appointmentModel');
exports.createPaymentSessionController = async (req, res) => {
  const { doctorId, doctorName, doctorFee, appointmentDetails } = req.body;
  const { userId } = req.body;
  try {
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      line_items: [
        {
          price_data: {
            currency: "inr",
            product_data: {
              name: "Doctor Appointment",
              description: `Appointment with Dr. ${doctorName} on ${appointmentDetails.appointmentDateTime}`,
            },
            unit_amount: doctorFee * 100, // Amount in cents
          },
          quantity: 1,
        },
      ],
      mode: "payment",
      success_url: `${process.env.FRONTEND_URL}/processing-payment?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${process.env.FRONTEND_URL}/appointment-cancelled`,
    });
    const newAppointment = new Appointment({
      userId,
      doctorId, 
      appointmentDateTime: new Date(appointmentDetails.appointmentDateTime),
      status: "initiated",
      transactionInfo: {
        sessionId: session.id,
        amount: doctorFee, 
        currency: "inr",
        paymentStatus: "pending",
        paymentInitiatedAt: new Date()
      },
    });

    await newAppointment.save();

    res.send({
      sessionId: session.id,
      url: session.url,
      appointmentId: newAppointment._id,
      success: true,
      message: "Payment session created successfully",
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error creating payment session",
    });
  }
};

exports.checkPaymentStatusController = async (req, res) => {
  try {
    const { sessionId } = req.params;
    const appointment = await Appointment.findOne({ 'transactionInfo.sessionId': sessionId });

    if (!appointment) {
      return res.status(404).json({ status: 'not_found' });
    }

    const paymentStatus = appointment.transactionInfo.paymentStatus;

    res.json({ status: paymentStatus });
  } catch (error) {
    console.error('Error checking payment status:', error);
    res.status(500).json({ status: 'error' });
  }
};


exports.webhookController = async (req, res) => {
  const sig = req.headers['stripe-signature'];
  let event;

  try {
    event = stripe.webhooks.constructEvent(req.body, sig, process.env.STRIPE_WEBHOOK_SECRET);
  } catch (err) {
    console.error(`Webhook Error: ${err.message}`);
    return res.status(400).send(`Webhook Error: ${err.message}`);
  }

  // Handle the event
  switch (event.type) {
    case 'checkout.session.completed':
      const session = event.data.object;
      await handleSuccessfulPayment(session);
      break;
    case 'payment_intent.payment_failed':
      const paymentIntent = event.data.object;
      await handleFailedPayment(paymentIntent);
      break;
    // ... handle other event types
    default:
      console.log(`Unhandled event type ${event.type}`);
  }

  // Return a response to acknowledge receipt of the event
  res.json({received: true});
};

async function handleSuccessfulPayment(session) {
  try {
    const appointment = await Appointment.findOne({ 'transactionInfo.sessionId': session.id });
    if (!appointment) {
      console.error('Appointment not found for session:', session.id);
      return;
    }

    appointment.transactionInfo.paymentStatus = 'succeeded';
    appointment.status = 'scheduled';
    await appointment.save();

    // Here you might want to send a confirmation email to the user and doctor
    // sendConfirmationEmails(appointment);
  } catch (error) {
    console.error('Error handling successful payment:', error);
  }
}

async function handleFailedPayment(paymentIntent) {
  try {
    const appointment = await Appointment.findOne({ 'transactionInfo.sessionId': paymentIntent.id });
    if (!appointment) {
      console.error('Appointment not found for payment intent:', paymentIntent.id);
      return;
    }

    appointment.transactionInfo.paymentStatus = 'failed';
    appointment.status = 'cancelled';
    await appointment.save();

    // Here you might want to send a notification to the user about the failed payment
    // sendPaymentFailedNotification(appointment);
  } catch (error) {
    console.error('Error handling failed payment:', error);
  }
}

exports.paymentCompleteController = async (req, res) => {
  const result = Promise.all([
    stripe.checkout.sessions.retrieve(req.query.session_id, {
      expand: ["payment_intent.payment_method"],
    }),
    stripe.checkout.sessions.listLineItems(req.query.session_id),
  ]);

  console.log(JSON.stringify(await result));

  res.send("Your payment was successful");
};

exports.paymentCancelController = async (req, res) => {
  res.send("Cancelled");
};


