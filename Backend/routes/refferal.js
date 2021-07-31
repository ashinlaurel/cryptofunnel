const express = require("express");
const router = express.Router();

const { isSignedIn, isAuthenticated, isAdmin } = require("../controllers/auth");
const {
  createNewRefferal,
  getByUser,
  checkIfExist,
  getNewCode,
  getCodeData,
  deleteRefferal,
} = require("../controllers/refferal/refferal");
const { getUserById } = require("../controllers/user");

router.param("userId", getUserById);

router.post("/:userId/getNewCode", getNewCode);
router.post("/:userId/createnew", createNewRefferal);
// router.post("/:userId/getbyuser", isSignedIn, isAuthenticated, getByUser);
router.post("/:userId/getbyuser", isSignedIn, getByUser);
// router.post("/:userId/checkIfExists", isSignedIn, checkIfExist);
router.post("/:userId/checkIfExists", isSignedIn, checkIfExist);
router.post("/:userId/getCodeData", getCodeData);
router.post("/:userId/deleteRefferal", deleteRefferal);

module.exports = router;
