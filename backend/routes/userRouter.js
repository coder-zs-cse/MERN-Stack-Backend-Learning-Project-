const express = require("express");
const { registerController, loginController,forgotPasswordController, resetPasswordController, googleLoginController, facebookLoginController, googleRegisterController, facebookRegisterController } = require("../controllers/authController");
const { userInfoController,updateUserProfileController, subscribeNewsletterController, getListOfDoctorsController } = require("../controllers/userController");
const router = express.Router();
const {authMiddleware,userAuth} = require('../middleware/authMiddleware');

router.post('/register',registerController)

router.post('/login',loginController)

router.post('/auth/register/google', googleRegisterController)

router.post('/auth/register/facebook', facebookRegisterController)

router.post('/auth/login/google', googleLoginController)

router.post('/auth/login/facebook', facebookLoginController)

router.post('/get-user-info-by-id',authMiddleware, userInfoController)

router.post('/forgot-password',forgotPasswordController)

router.patch('/reset-password/',resetPasswordController)

router.put('/update-user-profile/',userAuth, updateUserProfileController)

router.post('/subscribe-newsletter',subscribeNewsletterController)

router.get('/list-of-doctors',authMiddleware,userAuth,getListOfDoctorsController)


module.exports = router