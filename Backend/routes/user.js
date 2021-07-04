const express = require("express");
const router = express.Router();

const {
  getUserById,
  getUser,
  updateUser,
  userPurchaseList,
  getAllUsers,
  setInfulencerRequest,
  AcceptInfluencer,
} = require("../controllers/user");
const { isSignedIn, isAuthenticated, isAdmin } = require("../controllers/auth");

router.param("userId", getUserById);

router.get("/user/:userId", isSignedIn, isAuthenticated, getUser);
router.put("/user/:userId", isSignedIn, isAuthenticated, updateUser);
router.post(
  "/user/:userId/getAllUsers",
  isSignedIn,
  // isAuthenticated,
  getAllUsers
);

router.get(
  "/orders/user/:userId",
  isSignedIn,
  isAuthenticated,
  userPurchaseList
);
router.post(
  "/user/:userId/requestInfluencer",
  isSignedIn,
  // isAuthenticated,
  setInfulencerRequest
);

router.post(
  "/user/:userId/acceptInfluencer",
  isSignedIn,
  // isAuthenticated,
  AcceptInfluencer
);

module.exports = router;
