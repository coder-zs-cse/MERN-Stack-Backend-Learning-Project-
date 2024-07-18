const express = require("express");
const router = express.Router();
const { updateDoctorProfileController, getListOfDoctorsController } = require("../controllers/doctorController");
const {authMiddleware, doctorAuth} = require('../middleware/authMiddleware');

router.put('/update-doctor-profile/',authMiddleware,doctorAuth,updateDoctorProfileController)


module.exports = router
