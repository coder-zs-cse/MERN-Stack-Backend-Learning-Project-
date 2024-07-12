const express = require("express");
const { registerController, loginController,forgotPasswordController, resetPasswordController, googleLoginController } = require("../controllers/authController");
const { userInfoController } = require("../controllers/userController");

const router = express.Router();
const authMiddleware = require('../middleware/authMiddleware')

router.post('/register',registerController)

router.post('/login',loginController)

router.post('/auth/google', googleLoginController)

router.post('/get-user-info-by-id',authMiddleware, userInfoController)

router.post('/forgot-password',forgotPasswordController)

router.patch('/reset-password/',resetPasswordController)


module.exports = router