const express = require("express");
const router = express.Router();

const { isSignedIn, isAuthenticated, isAdmin } = require("../controllers/auth");
const { getUserById } = require("../controllers/userInfo");

router.post("/userinfo", getUserById);
// router.put("/user/:userId", updateUser);

module.exports = router;
