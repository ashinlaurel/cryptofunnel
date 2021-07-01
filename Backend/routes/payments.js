const express = require("express");
const router = express.Router();

const { isSignedIn, isAuthenticated, isAdmin } = require("../controllers/auth");
const {
  getPaymentIntent,
  paymentResolver,
  confirmpayment,
} = require("../controllers/payments/payment");
const { getUserById } = require("../controllers/user");

router.param("userId", getUserById);

router.post("/:userId/payment_intents", isSignedIn, getPaymentIntent);
router.post("/:userId/paymentRoute", isSignedIn, paymentResolver);
router.post("/:userId/confirmpayment", isSignedIn, confirmpayment);

module.exports = router;
