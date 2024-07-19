const mongoose = require("mongoose");
const crypto = require("crypto");

const doctorDetailsSchema = new mongoose.Schema({
  designation: { type: String, default: "" },
  experience: { type: Number, default: null }, // Using 0 for number type
  clinicName: { type: String, default: "" },
  costOfCharge: { type: Number, default: null }, // Using 0 for number type
  timings: { type: String, default: "" },
});
const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      // required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: function () {
        return this.authProvider === "local";
      },
    },
    role: {
      type: String,
      enum: ["user", "admin", "doctor"],
      default: "user",
    },
    authProvider: {
      type: String,
      required: true,
      enum: ["local", "google", "facebook"],
      default: "local",
    },
    facebookId: { type: String },
    resetPasswordToken: { type: String },
    resetPasswordExpires: { type: Date },
    passwordChangedAt: { type: Date },
    newsletterSubscription: {
      type: Boolean,
      default: false,
    },
    doctorDetails: doctorDetailsSchema,
  },
  {
    timestamps: true,
  }
);

userSchema.pre('save', function(next) {
  if (this.isModified('role') && this.role === 'doctor' && !this.doctorDetails) {
    this.doctorDetails = {}
  }
  next();
});

userSchema.methods.createResetPasswordToken = function () {
  const resetToken = crypto.randomBytes(32).toString("hex");
  this.resetPasswordToken = crypto
    .createHash("sha256")
    .update(resetToken)
    .digest("hex");
  this.resetPasswordExpires = Date.now() + 10 * 60 * 1000;
  return resetToken;
};

userSchema.methods.resetPassword = function (password) {
  this.password = password;
  this.resetPasswordToken = undefined;
  this.resetPasswordExpires = undefined;
};

const userModel = mongoose.model("users", userSchema);

module.exports = userModel;
