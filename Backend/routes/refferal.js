const express = require("express");
const router = express.Router();

const { isSignedIn, isAuthenticated, isAdmin } = require("../controllers/auth");
const { createNewRefferal } = require("../controllers/refferal/refferal");

// router.param("userId", getUserById);

router.post("/createnew", createNewRefferal);

module.exports = router;
