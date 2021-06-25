const express = require("express");
const router = express.Router();

const { isSignedIn, isAuthenticated, isAdmin } = require("../controllers/auth");
const { verifyMail } = require("../controllers/mail");

const { getUserById } = require("../controllers/user");

router.param("userId", getUserById);

router.post("/:userId/verifyEmail", verifyMail);

module.exports = router;
