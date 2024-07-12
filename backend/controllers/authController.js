const User = require("../models/userModel");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const sendEmail = require("../utils/email");
const crypto = require("crypto");
const axios = require("axios");
const { OAuth2Client } = require("google-auth-library");

const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);

const signToken = async (id) => {
  const token = await jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN,
  });
  return token;
};

exports.registerController = async (req, res) => {
  try {
    const { email, password, name } = req.body;
    const Model = User;

    const userExist = await Model.findOne({ email });
    if (userExist) {
      return res.status(200).send({
        message: "User with same email already exists",
        success: false,
      });
    }
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const newUser = new Model({
      email,
      password: hashedPassword,
      name,
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

exports.loginController = async (req, res) => {
  try {
    const { email, password } = req.body;
    const Model = User;

    const user = await Model.findOne({ email });
    if (!user) {
      return res
        .status(200)
        .send({ message: "User does not exists", success: false });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    // console.log(req.body);
    if (!isMatch) {
      return res.status(200).send({
        message: "Incorrect password or email address",
        success: false,
      });
    }
    const token = await signToken(user._id);
    res
      .status(200)
      .send({ message: "Login Successfull", success: true, data: { token } });
  } catch (error) {
    res.status(500).send({ message: "Server error", success: false, error });
  }
};

exports.forgotPasswordController = async (req, res) => {
  try {
    const { email } = req.body;
    const Model = User;
    const user = await Model.findOne({ email });
    if (!user) {
      return res.status(200).send({
        message: "User not found",
        success: false,
      });
    }

    const resetToken = user.createResetPasswordToken();
    // console.log(resetToken);

    await user.save();

    // const resetUrl = `${req.protocol}://${req.get(
    //   "host"
    // )}/api/v1/user/reset-password/${resetToken}`;
    const resetUrl = `http://localhost:5173/reset-password/${resetToken}`;
    const message = `We received a request to reset your password for your account associated with this email address. If you made this request, please click on the link below to reset your password: \n\n ${resetUrl} \n\n If you did not request a password reset, please ignore this email. Your password will remain unchanged.`;

    try {
      await sendEmail({
        email: user.email,
        subject: "Password Reset Link",
        message,
      });
      return res.send({
        success: true,
        message: "Reset password link sent to your email",
      });
    } catch (error) {
      user.resetPasswordToken = undefined;
      user.resetPasswordExpire = undefined;
      user.save();
    }

    // console.log(user)
  } catch (error) {}
};

exports.resetPasswordController = async (req, res) => {
  // console.log(req.body);
  try {
    const token = crypto
      .createHash("sha256")
      .update(req.body.token)
      .digest("hex");
    // console.log(token,req.body.token);
    const user = await User.findOne({
      resetPasswordToken: token,
      resetPasswordExpires: { $gt: Date.now() },
    });
    if (!user) {
      return res.status(400).send({
        success: false,
        message: "Invalid token",
      });
    }
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(req.body.password, salt);

    user.password = hashedPassword;
    user.resetPasswordToken = undefined;
    user.resetPasswordExpires = undefined;
    user.passwordChangedAt = Date.now();

    await user.save();

    const jwtToken = await signToken(user._id);
    res.status(200).send({
      message: "Password Reset Successfully",
      success: true,
      data: { token: jwtToken },
    });
    // const user
  } catch (err) {}
};

exports.googleLoginController = async (req, res) => {
  const { token } = req.body;
  try {
    const ticket = await client.verifyIdToken({
      idToken: token,
      audience: process.env.GOOGLE_CLIENT_ID,
    });
    const { email, name } = ticket.getPayload();

    let user = await User.findOne({ email });

    if (!user) {
      // Create new user if doesn't exist
      user = new User({
        email,
        name,
        authProvider: "google",
      });
      await user.save();
    }
    // console.log("user",user);
    // Generate JWT or session for the user
    const jwtToken = await signToken(user._id);
    res.status(200).send({
      message: "Google Signin successfull",
      success: true,
      data: { token: jwtToken },
    });
  } catch (error) {
    console.error("Error verifying Google token:", error);
    res.status(401).json({ error: "Authentication failed" });
  }
};

exports.facebookLoginController = async (req, res) => {
  const { token } = req.body;
  try {
    // Verify the Facebook access token
    const response = await axios.get(`https://graph.facebook.com/me?fields=id,name,email&access_token=${token}`);
    // console.log(response);
    const { id, name, email } = response.data;

    // Check if user exists
    let user = await User.findOne({ email });
    
    if (!user) {
      // Create new user if doesn't exist
      user = new User({
        email,
        name,
        authProvider: 'facebook',
        facebookId: id,
      });
      await user.save();
    }
    
    // Generate JWT or session for the user
    const jwtToken = await signToken(user._id);
    res.status(200).send({
      message: "Facebook Signin successfull",
      success: true,
      data: { token: jwtToken },
    });
  } catch (error) {
    console.error('Error verifying Facebook token:', error);
    res.status(401).json({ error: 'Authentication failed' });
  }

    // Generate JWT or session for the user
  
};
