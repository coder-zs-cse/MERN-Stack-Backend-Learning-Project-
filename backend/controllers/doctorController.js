const User = require("../models/userModel");

exports.updateDoctorProfileController = async (req, res) => {
  try {
    const {
      name,
      designation,
      experience,
      clinicName,
      costOfCharge,
      timings,
    } = req.body;

    let Model = User;
    const user = await Model.findById(req.body.userId);
    if (!user) {
      return res.status(200).send({
        message: "User not found",
        success: false,
      });
    } else {
      
      user.name = name,
      user.doctorDetails = user.doctorDetails || {};
      user.doctorDetails.designation = designation;
      user.doctorDetails.experience = experience;
      user.doctorDetails.clinicName = clinicName;
      user.doctorDetails.costOfCharge = costOfCharge;
      user.doctorDetails.timings = timings;
      await user.save();
      return res.status(200).send({
        message: "Doctor profile updated successfully",
        success: true,
        data: user,
      });
    }
  } catch (error) {
    return res.status(500).send({
      message: "Error updating doctor profile",
      success: false,
    });
  }
};

