const User = require("../models/user");
const UserInfo = require("../models/userInfo");
const { check, validationResult } = require("express-validator");
var jwt = require("jsonwebtoken");
var expressJwt = require("express-jwt");
const { stubArray } = require("lodash");
const { v1: uuidv1 } = require("uuid");
const crypto = require("crypto");

exports.signup = (req, res) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(422).json({
      error: errors.array()[0].msg,
    });
  }
  // console.log(req.body);

  const user = new User({
    name: req.body.name,
    email: req.body.email,
    password: req.body.password,
    emailVerified: false,
    plan: 0,
  });
  user.save((err, user) => {
    if (err) {
      if (err.message.includes("E11000")) {
        return res.status(400).json({
          err: "Email already exists",
        });
      }
      console.log("user err", err.message);
      return res.status(400).json({
        err: "NOT able to save user in DB",
      });
    }
    let payload = req.body;
    payload.userId = user._id;
    const userinfo = new UserInfo(payload);
    userinfo.save((err, u) => {
      if (err) {
        console.log("userinfo err", err);
        return res.status(400).json({
          err: "NOT able to save userinfo in DB",
        });
      }
    });
    return res.json({
      name: user.name,
      email: user.email,
      id: user._id,
    });
  });
};

exports.signin = (req, res) => {
  console.log("SIGININ ");
  const errors = validationResult(req);
  const { email, password } = req.body;

  if (!errors.isEmpty()) {
    return res.status(422).json({
      error: errors.array()[0].msg,
    });
  }

  User.findOne({ email }, (err, user) => {
    if (err || !user) {
      console.log("email no exist ");
      return res.status(400).json({
        error: "Email does not exists",
      });
    }

    if (!user.autheticate(password)) {
      console.log("pass dont match");
      return res.status(401).json({
        error: "Email and password do not match",
      });
    }

    //create token
    const token = jwt.sign(
      { _id: user._id, role: user.role },
      process.env.SECRET
    );
    //put token in cookie
    res.cookie("token", token, { expire: new Date() + 9999 });

    //send response to front end
    const { _id, name, email, role } = user;
    console.log("SIGININ IN DONE", user);
    return res.json({ token, user: { _id, name, email, role } });
  });
};

exports.signout = (req, res) => {
  res.clearCookie("token");
  res.json({
    message: "User signout successfully",
  });
};

//protected routes
exports.isSignedIn = expressJwt({
  secret: process.env.SECRET,
  userProperty: "auth",
});

//custom middlewares
exports.isAuthenticated = (req, res, next) => {
  // console.log(req.body.profile, req.auth);
  let checker =
    req.body.profile && req.auth && req.body.profile._id == req.auth._id;
  if (!checker) {
    return res.status(403).json({
      error: "ACCESS DENIED",
    });
  }
  next();
};

exports.isAdmin = (req, res, next) => {
  if (req.auth.role !== 1) {
    return res.status(403).json({
      error: "You are not ADMIN, Access denied",
    });
  }
  next();
};

exports.resetPassword = async (req, res) => {
  let { id, pass } = req.body;
  // console.log("REPASS");

  console.log(id, pass);
  let salt = uuidv1();
  if (!pass) return "";
  try {
    let encPass = crypto.createHmac("sha256", salt).update(pass).digest("hex");
    let user = await User.findByIdAndUpdate(
      id,
      { encry_password: encPass, salt: salt },
      {
        safe: true,
        useFindAndModify: false,
      }
    );
    return res.status(200).json({ user });
  } catch (err) {
    console.log("REPASS ERROR", err);
    return res.status(400).json({ error: err });
  }
};

exports.TestSignedIn = async (req, res) => {
  console.log("Testing USER", req.auth);
  id = req.auth._id;
  try {
    let user = await User.findById(id);
    return res.status(200).json({ user });
  } catch (err) {
    console.log("VERIFY ERROR", err);
    return res.status(400).json({ error: err });
  }
};
