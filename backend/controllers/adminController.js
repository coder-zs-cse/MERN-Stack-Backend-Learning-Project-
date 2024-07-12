const User = require("../models/userModel");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const sendEmail = require("../utils/email");

exports.getListOfUsers = async (req, res) => {
  try {
    let Model = User;
    const users = await Model.find({});
    if (!users) {
      return res.status(200).send({
        message: "No users found",
        success: false,
      });
    } else {
      let output = [];
      users.forEach((user) => {
        let userOutput = {
          id: user._id,
          name: user.name,
          email: user.email,
          isAdmin: user.isAdmin,
        };
        output.push(userOutput);
      });
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


exports.deleteUserController = async (req, res) => {

  try {
    let Model = User;
    const user = await Model.findById(req.params.id);
    if (!user) {
      return res.status(200).send({
        message: "No user found",
        success: false,
      });
    } else {
      await Model.deleteOne({ _id: req.params.id });
      return res.status(200).send({
        success: true,
        message: "User deleted successfully",
      });
    }
  } catch (error) {
    return res.status(500).send({
      message: "Error deleting user",
      success: false,
    });
  }
}