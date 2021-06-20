var express = require("express");
var router = express.Router();
const { check, validationResult } = require("express-validator");
const {
  signout,
  signup,
  signin,
  isSignedIn,
  isAuthenticated,
  isAdmin,
  resetPassword,
} = require("../controllers/auth");

router.post(
  "/signup",
  [
    check("name", "name should be at least 3 char").isLength({ min: 3 }),
    check("email", "email is required").isEmail(),
    check("password", "password should be at least 3 char").isLength({
      min: 3,
    }),
  ],
  signup
);

router.post(
  "/signin",
  [
    check("email", "email is required").isEmail(),
    check("password", "password field is required").isLength({ min: 1 }),
  ],
  signin
);
router.post("/:id/resetpassword", resetPassword);

router.post(
  "/adminsignInTest",
  isSignedIn,
  isAuthenticated,
  isAdmin,
  (req, res) => {
    console.log("signedIn");
    res.status(200).json(req.auth);
  }
);
router.post("/signInTest", isSignedIn, (req, res) => {
  console.log("signedIn");
  res.status(200).json(req.auth);
});

router.get("/signout", signout);

module.exports = router;
