const User = require("../models/userModel");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const sendEmail = require("../utils/email");
const {
  NewsletterModel,
  CampaignSendModel,
} = require("../models/newsletterModel");

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
          role: user.role,
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
      user.role = req.body.role;
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
    const { email, role } = req.body;
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
      role,
      authProvider: "local",
    });
    await newUser.save();
    // // console.log("Working");
    res
      .status(200)
      .send({ message: "User created successfully", success: true });
  } catch (error) {
    return res.status(500).send({ message: "Server error", success: false });
  }
};

exports.sendNewsletterController = async (req, res) => {
  try {
    const { subject, message } = req.body;
    const Model = User
    const subscribedUsers = await Model.find({newsletterSubscription: true});
    const newCampaign = new NewsletterModel({
      name: "simple",
      subject,
      content: message,
      sentAt: Date.now(),
    });
    await newCampaign.save();
    subscribedUsers.forEach(async (user) => {
      await sendEmail({
        email: user.email,
        subject,
        message,
      });
      const newCampaignSend = new CampaignSendModel({
        campaign: newCampaign._id,
        user: user._id,
        sentAt: Date.now(),
      });
      await newCampaignSend.save();
    });
    return res.status(200).send({
      success: true,
      message: "Newsletter sent successfully",
    });
  } catch (error) {
    console.log(error);
    return res.status(500).send({ message: "Server error", success: false });
  }
};
