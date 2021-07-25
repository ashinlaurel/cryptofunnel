const express = require("express");
const router = express.Router();

const { isSignedIn, isAuthenticated, isAdmin } = require("../controllers/auth");

const { getUserById } = require("../controllers/user");
const { coinbaseConfirmPayment, rawBody } = require("../controllers/webhooks");

// router.param("userId", getUserById);

router.post("/confirmBitPayment",rawBody, coinbaseConfirmPayment);

module.exports = router;
