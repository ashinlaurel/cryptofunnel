const express = require("express");
const router = express.Router();

const { isSignedIn, isAuthenticated, isAdmin } = require("../controllers/auth");
const {
  verifyMail,
  verifyUserByToken,
  ForgotPasswordMail,
  resetPassword,
  AddToMailerList,
} = require("../controllers/mail");

const { getUserById } = require("../controllers/user");

router.param("userId", getUserById);

router.post("/:userId/verifyEmail", verifyMail);
router.post("/verifyEmail", verifyMail);
router.post("/verifyUser", isSignedIn, verifyUserByToken);
router.post("/resetpassemail", ForgotPasswordMail);
router.post("/resetpasswordbytoken", isSignedIn, resetPassword);
router.post("/AddToMailerList", AddToMailerList);

module.exports = router;
