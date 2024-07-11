const express = require("express");
const { registerController, loginController, userInfoController,forgotPasswordController, resetPasswordController } = require("../controllers/userController");
const router = express.Router();
const authMiddleware = require('../middleware/authMiddleware')

router.post('/register',registerController)

router.post('/login',loginController)

router.post('/get-user-info-by-id',authMiddleware, userInfoController)

router.post('/forgot-password',forgotPasswordController)

router.patch('/reset-password/:token',resetPasswordController)

module.exports = router