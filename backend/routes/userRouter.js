const express = require("express");
const { registerController, loginController,forgotPasswordController, resetPasswordController, googleLoginController, facebookLoginController } = require("../controllers/authController");
const { userInfoController,updateUserProfileController, subscribeNewsletterController } = require("../controllers/userController");
const router = express.Router();
const authMiddleware = require('../middleware/authMiddleware');

router.post('/register',registerController)

router.post('/login',loginController)

router.post('/auth/google', googleLoginController)

router.post('/auth/facebook', facebookLoginController)

router.post('/get-user-info-by-id',authMiddleware, userInfoController)

router.post('/forgot-password',forgotPasswordController)

router.patch('/reset-password/',resetPasswordController)

router.put('/update-user-profile/',updateUserProfileController)

router.post('/subscribe-newsletter',subscribeNewsletterController)

module.exports = router