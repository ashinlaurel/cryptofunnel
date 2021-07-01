const express = require("express");
const router = express.Router();

const { isSignedIn, isAuthenticated, isAdmin } = require("../controllers/auth");
const {
  getPaymentIntent,
  paymentResolver,
} = require("../controllers/payments/payment");
const { getUserById } = require("../controllers/user");

router.param("userId", getUserById);

router.post("/:userId/payment_intents", isSignedIn, getPaymentIntent);
router.post("/:userId/paymentRoute", isSignedIn, paymentResolver);

module.exports = router;
