const User = require("../models/userModel");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const sendEmail = require("../utils/email");
const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);
const Appointment = require("../models/appointmentModel");
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

exports.myAppointmentsController = async (req, res) => {
  try {
    const userId = req.body.userId;
    const appointments = await Appointment.find({ userId })
      .populate("doctorId", "name email doctorDetails")
      .sort({ appointmentDateTime: -1 });
    // console.log(appointments);
    res.json({
      success: true,
      data: { appointments },
    });
  } catch (error) {
    console.error("Error fetching appointments:", error);
    res.status(500).json({
      success: false,
      message: "Error fetching appointments",
    });
  }
};

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
