const express = require("express");
const router = express.Router();
const {authMiddleware,userAuth} = require('../middleware/authMiddleware');
const { createPaymentSessionController, paymentCompleteController, paymentCancelController, webhookController, checkPaymentStatusController } = require("../controllers/stripeController");

router.post('/webhook', express.raw({type: 'application/json'}), webhookController)

router.use(express.json())

router.post('/create-payment-session',authMiddleware,userAuth,createPaymentSessionController)

router.get('/payment/complete',paymentCompleteController)

router.get('/payment/cancel',paymentCancelController)
 

router.get('/payment/status/:sessionId', authMiddleware, userAuth, checkPaymentStatusController)

module.exports = router