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
};

exports.updateUserController = async (req, res) => {
  try {
    let Model = User;
    const user = await Model.findById(req.params.id);
    if (!user) {
      return res.status(200).send({
        message: "No user found",
        success: false,
      });
    } else {
      user.isAdmin = req.body.isAdmin;
      await user.save();
      return res.status(200).send({
        success: true,
        message: "User updated successfully",
      });
    }
  } catch (error) {
    return res.status(500).send({
      message: "Error updating user",
      success: false,
    });
  }
};

exports.newDefaultUserController = async (req, res) => {
  try {
    const { email, isAdmin } = req.body;
    const Model = User;
    const userExist = await Model.findOne({ email });
    if (userExist) {
      return res.status(200).send({
        message: "User with same email already exists",
        success: false,
      });
    }
    // console.log("broo");
    defaultPassword = "password";
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(defaultPassword, salt);

    const newUser = new Model({
      email,
      password: hashedPassword,
      isAdmin,
      authProvider: "local",
    });
    await newUser.save();
    // // console.log("Working");
    res
      .status(200)
      .send({ message: "User created successfully", success: true });
  } catch (error) {
    res.status(500).send({ message: "Server error", success: false });
  }
};


exports.sendNewsletterController = async (req, res) => {
  try {
    const { subject, message } = req.body;
    const Model = User;
    const users = await Model.find({});
    users.forEach(async (user) => {
      await sendEmail({
        email: user.email,
        subject,
        message,
      });
    });
    return res.status(200).send({
      success: true,
      message: "Newsletter sent successfully",
    });
  }
  catch(error){
    res.status(500).send({ message: "Server error", success: false });
  }
}