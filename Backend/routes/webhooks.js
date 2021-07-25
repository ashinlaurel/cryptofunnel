const express = require("express");
const router = express.Router();

const { coinbaseConfirmPayment, rawBody } = require("../controllers/webhooks");

// router.param("userId", getUserById);

router.post("/confirmBitPayment", rawBody, coinbaseConfirmPayment);

module.exports = router;
