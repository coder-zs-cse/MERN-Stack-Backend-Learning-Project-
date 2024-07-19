const User = require("../models/userModel");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const sendEmail = require("../utils/email");
const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);

exports.userInfoController = async (req, res) => {
  try {
    let Model = User;
    const user = await Model.findOne({ _id: req.body.userId });
    if (!user) {
      return res.status(200).send({
        message: "User not found",
        success: false,
      });
    } else {
      let output = {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
        // role: req.body.role,
      };
      if (output.role === "doctor") {
        output["doctorDetails"] = user.doctorDetails;
      }

      return res.status(200).send({
        success: true,
        data: output,
      });
    }
  } catch (error) {
    return res.status(500).send({
      message: "Error getting user info",
      success: false,
    });
  }
};

exports.updateUserProfileController = async (req, res) => {
  try {
    let Model = User;
    const user = await Model.findById(req.body.id);
    if (!user) {
      return res.status(200).send({
        message: "User not found",
        success: false,
      });
    } else {
      if (user.email !== req.body.email) {
        const userExist = await Model.findOne({ email: req.body.email });
        if (userExist) {
          return res.status(200).send({
            message: "User with same email already exists",
            success: false,
          });
        }
      }
      user.set({
        name: req.body.name,
        email: req.body.email,
      });
      await user.save();
      return res.status(200).send({
        success: true,
        message: "User profile successfully",
        data: {
          id: user._id,
          name: user.name,
          email: user.email,
          role: user.role,
        },
      });
    }
  } catch (err) {
    return res.status(500).send({
      message: "Error updating user info",
      success: false,
    });
  }
};

exports.subscribeNewsletterController = async (req, res) => {
  try {
    let Model = User;
    const user = await Model.findOne({ email: req.body.email });
    if (!user) {
      return res.status(200).send({
        message: "User not found",
        success: false,
      });
    } else {
      if (user.newsletterSubscription == true) {
        return res.status(200).send({
          success: false,
          message: "Already subscribed to newsletter",
        });
      }
      user.set({
        newsletterSubscription: true,
      });
      await user.save();
      return res.status(200).send({
        success: true,
        message: "Subscribed to newsletter successfully",
      });
    }
  } catch (error) {
    return res.status(500).send({
      message: "Error subscribing to newsletter",
      success: false,
    });
  }
};

exports.getListOfDoctorsController = async (req, res) => {
  try {
    const doctors = await User.find({ role: "doctor" });
    return res.status(200).send({
      message: "List of doctors",
      success: true,
      data: doctors,
    });
  } catch (error) {
    return res.status(500).send({
      message: "Error fetching list of doctors",
      success: false,
    });
  }
};

exports.getDoctorDetailsById = async (req, res) => {
  try {
    const doctor = await User.findById(req.params.id);
    if (!doctor || doctor.role !== "doctor") {
      return res.status(200).send({
        message: "Doctor not found",
        success: false,
      });
    }
    return res.status(200).send({
      message: "Doctor details fetched successfully",
      success: true,
      data: doctor,
    });
  } catch (error) {
    console.log("okk");
    return res.status(500).send({
      message: "Error fetching list of doctors",
      success: false,
    });
  }
};

exports.createPaymentSessionController = async (req, res) => {

  const { doctorName, doctorFee, appointmentDetails } = req.body;
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
      success_url: `${process.env.BASE_URL}/api/v1/user/payment/complete?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${process.env.BASE_URL}/api/v1/user/payment/cancel`,
    });
    console.log(session.url);
    // res.redirect(session.url);
    
    res.send({
      sessionId: session.id,
      url: session.url,
      success: true,
      message: "Payment session created successfully",
    });
  } catch (error) {
    console.log(error);
    res.send({
      success: false,
      message: "Error creating payment session",
    });
  }
};

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
  res.send('Cancelled')
}

// exports.createPaymentSessionController = async (req, res) => {

//   console.log("ok");
//   try {
    
//     return res.send("okk");
//     res.json({ url: session.url });
//   } catch (error) {
//     console.error("Error creating checkout session:", error);
//     res.status(500).json({ error: "Failed to create checkout session" });
//   }
// };
