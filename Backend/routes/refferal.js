const express = require("express");
const router = express.Router();

const { isSignedIn, isAuthenticated, isAdmin } = require("../controllers/auth");
const {
  createNewRefferal,
  getByUser,
} = require("../controllers/refferal/refferal");
const { getUserById } = require("../controllers/user");

router.param("userId", getUserById);

router.post("/createnew", createNewRefferal);
// router.post("/:userId/getbyuser", isSignedIn, isAuthenticated, getByUser);
router.post("/:userId/getbyuser", isSignedIn, getByUser);

module.exports = router;
