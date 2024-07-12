const mongoose = require("mongoose");
const crypto = require("crypto");

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: function () {
        return this.authProvider === "local";
      },
    },
    isAdmin: {
      type: Boolean,
      default: false, // New users are not admins by default
    },
    authProvider: {
      type: String,
      required: true,
      enum: ["local", "google"],
    },
    resetPasswordToken: { type: String },
    resetPasswordExpires: { type: Date },
    passwordChangedAt: { type: Date },
  },
  {
    timestamps: true,
  }
);

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
