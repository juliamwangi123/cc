const express = require('express')
const router = express.Router();
const {accessToken} = require('../Middleware/mpesaAccessToken')
const {
    initiateSTKPush,
    // stkPushCallback,
    // confirmPayment
}= require( "../Controllers/lipaNaMpesa")



router.route('/stkPush').post(accessToken,initiateSTKPush)
// router.route('/stkPushCallback/:Order_ID').post(stkPushCallback)
// router.route('/confirmPayment/:CheckoutRequestID').post(accessToken,confirmPayment)

module.exports = router
