const express = require("express");
const router = express.Router();

const { isSignedIn, isAuthenticated, isAdmin } = require("../controllers/auth");
const { getPaymentIntent } = require("../controllers/payments/payment");
const { getUserById } = require("../controllers/user");

router.param("userId", getUserById);

router.post("/:userId/payment_intents", isSignedIn, getPaymentIntent);

module.exports = router;
