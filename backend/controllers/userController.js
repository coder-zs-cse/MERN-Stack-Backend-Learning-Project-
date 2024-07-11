const User = require("../models/userModel");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const sendEmail = require("../utils/email");



const userInfoController = async (req, res) => {
  try {
    let Model = User
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
        isAdmin: user.isAdmin
        // role: req.body.role,
      };
      // if (output.role === "teacher") {
      //   output["speciality"] = user.speciality;
      // }
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


module.exports = { userInfoController };
