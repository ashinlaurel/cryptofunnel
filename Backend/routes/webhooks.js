const express = require("express");
const router = express.Router();

const {
  coinbaseConfirmPayment,
  rawBody,
  stripeWebhook,
} = require("../controllers/webhooks");

// router.param("userId", getUserById);

router.post("/confirmBitPayment", rawBody, coinbaseConfirmPayment);
router.post(
  "/stripeWebhook",
  // express.raw({ type: "application/json" }),
  rawBody,
  stripeWebhook
);

module.exports = router;
