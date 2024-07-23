const express = require("express");
const { registerController, loginController,forgotPasswordController, resetPasswordController, googleLoginController, facebookLoginController, googleRegisterController, facebookRegisterController } = require("../controllers/authController");
const { userInfoController,updateUserProfileController, subscribeNewsletterController, getListOfDoctorsController, getDoctorDetailsById, myAppointmentsController, upcomingAppointmentController, createTicketController, getTicketController, getTicketInfoController, getTicketThreadController, deleteTicketController } = require("../controllers/userController");
const router = express.Router();
const {authMiddleware,userAuth} = require('../middleware/authMiddleware');
const { auth } = require("google-auth-library");

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

router.get('/doctor-detail-by-id/:id',authMiddleware,userAuth,getDoctorDetailsById)

router.get('/my-appointments',authMiddleware,userAuth,myAppointmentsController)

router.get('/upcoming-appointment',authMiddleware,userAuth,upcomingAppointmentController)

router.post('/create-ticket',authMiddleware,userAuth,createTicketController)

router.get('/get-tickets',authMiddleware,userAuth,getTicketController)

router.get('/ticket/get-ticket-by-id/:ticketId',authMiddleware,userAuth,getTicketInfoController)

router.get('/ticket/:ticketId/replies',authMiddleware,userAuth,getTicketThreadController)

router.delete('/ticket/:ticketId',authMiddleware,userAuth,deleteTicketController)
module.exports = router