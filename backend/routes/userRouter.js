const express = require("express");
const { registerController, loginController,forgotPasswordController, resetPasswordController, googleLoginController, facebookLoginController } = require("../controllers/authController");
const { userInfoController,updateUserProfileController, subscribeNewsletterController, getListOfDoctorsController } = require("../controllers/userController");
const router = express.Router();
const {authMiddleware,userAuth} = require('../middleware/authMiddleware');

router.post('/register',registerController)

router.post('/login',loginController)

router.post('/auth/google', googleLoginController)

router.post('/auth/facebook', facebookLoginController)

router.post('/get-user-info-by-id',authMiddleware, userInfoController)

router.post('/forgot-password',forgotPasswordController)

router.patch('/reset-password/',resetPasswordController)

router.put('/update-user-profile/',userAuth, updateUserProfileController)

router.post('/subscribe-newsletter',subscribeNewsletterController)

router.get('/list-of-doctors',authMiddleware,userAuth,getListOfDoctorsController)


module.exports = router