const express = require("express");
const router = express.Router();

const { isSignedIn, isAuthenticated, isAdmin } = require("../controllers/auth");
const {
  getPaymentIntent,
  paymentResolver,
  confirmpayment,
  getAllPayHist,
  paymentResolverBit,
  getMangeSubscriptionURL,
} = require("../controllers/payments/payment");
const { getUserById } = require("../controllers/user");

router.param("userId", getUserById);

router.post("/:userId/payment_intents", isSignedIn, getPaymentIntent);
router.post("/:userId/paymentRoute", isSignedIn, paymentResolver);
router.post("/:userId/paymentBitRoute", isSignedIn, paymentResolverBit);
router.post("/:userId/confirmpayment", isSignedIn, confirmpayment);
router.post("/:userId/getAllPayHistory", isSignedIn, getAllPayHist);
router.post(
  "/:userId/getMangeSubscriptionURL",
  isSignedIn,
  getMangeSubscriptionURL
);

module.exports = router;
