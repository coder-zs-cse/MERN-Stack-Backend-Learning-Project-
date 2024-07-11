const User = require("../models/userModel");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const sendEmail = require("../utils/email");

const registerController = async (req, res) => {
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

const loginController = async (req, res) => {
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
    const token = await jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "1d",
    });
    // console.log("Working");
    res
      .status(200)
      .send({ message: "Login Successfull", success: true, data: { token } });
  } catch (error) {
    res.status(500).send({ message: "Server error", success: false, error });
  }
};

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
        email: user.email
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

const forgotPasswordController = async(req,res)=>{
  try {
    const {email} = req.body
    const Model = User
    const user = await Model.findOne({email})
    if(!user){
      return res.status(200).send({
        message: "User not found",
        success: false
      })
    }

    const resetToken = user.createResetPasswordToken()
    console.log(resetToken);


    await user.save()

    const resetUrl = `${req.protocol}://${req.get('host')}/api/v1/user/resetpassword/${resetToken}`
    const message = `We received a request to reset your password for your account associated with this email address. If you made this request, please click on the link below to reset your password: \n\n ${resetUrl} \n\n If you did not request a password reset, please ignore this email. Your password will remain unchanged.`

    try {
      await sendEmail({
        email: user.email,
        subject: "Password Reset Link",
        message,
      })
      return res.send({
        success: true,
        message: "Reset password link sent to your email"
      })
    } catch (error) {
      user.resetPasswordToken = undefined
      user.resetPasswordExpire = undefined
      user.save()
    }


    // console.log(user)
    

  } catch (error) {
    
  }
}

const resetPasswordController = async(req,res)=>{
  try {
    const token = crypto.createHash('sha256').update(req.params.token).digest('hex'); 
    const user = await User.findOne({
      resetPasswordToken: token,
      resetPasswordExpires: { $gt: Date.now() }
    })
    if(!user){
      return res.status(400).send({
        success: false,
        message: "Invalid token"
      })
    }
    user.password = req.body.password
    user.resetPasswordToken = undefined
    user.resetPasswordExpires = undefined
    // const user
  }
  catch(err){

  }
}


module.exports = { registerController, loginController, userInfoController, forgotPasswordController,resetPasswordController };
