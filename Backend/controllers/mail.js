const User = require("../models/user");
var jwt = require("jsonwebtoken");
var expressJwt = require("express-jwt");
const { v1: uuidv1 } = require("uuid");
const crypto = require("crypto");

////////////////////////////////////// change link  $$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$

const nodemailer = require("nodemailer");

exports.verifyMail = (req, res) => {
  //////// dont forget to pass customer name and CustId is login from frontend
  console.log(req.body);
  const { name, id, email } = req.body;
  let token = null;
  //  GENERATTING TOKEN
  console.log("generating verification email ", id);

  User.findById(id, (err, user) => {
    if (err || !user) {
      console.log("email no exist ");
      return res.status(400).json({
        error: "USER email does not exists",
      });
    }
    console.log(user);

    //create token
    token = jwt.sign({ _id: user._id, role: user.role }, process.env.SECRET);
    console.log("TOKEN:", token);
    //put token in cookie
    res.cookie("token", token, { expire: new Date() + 9999 });
    let link = `http://localhost:3000/verifyemail/${token}`;

    let output = `
   <h3> Hello ${name} </h3>
      <p>Thank you for registering at Crypto Funnel. Much Appreciated! Just one last step is laying ahead of you...</p>
      <p>To activate your account please follow this link: <a target="_" href="${link}">Verify Email </a></p>
      <p>Cheers</p>
      <p>Crypto Funnel Team</p>
  `;
    console.log("LINK", link);
    // create reusable transporter object using the default SMTP transport
    let transporter = nodemailer.createTransport({
      host: "smtp.gmail.com",
      port: 587,
      secure: false,
      auth: {
        user: "infocareenquiry@gmail.com",
        pass: "infocare12345",
      },
      tls: {
        rejectUnauthorized: false,
      },
    });

    // setup email data with unicode symbols
    let mailOptions = {
      from: '"Crypto Funnel" <infocareenquiry@gmail.com>', // sender address
      to: email, // list of receivers
      subject: "Email Verification", // Subject line
      text: req.body.message, // plain text body
      html: output, // html body
    };

    // send mail with defined transport object
    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        console.log(error);
        return res.send(error);
      }
      console.log("Message sent: %s", info.messageId);
      console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
    });
    return res.status(200).json({ note: "success" });
  });
};

exports.verifyUserByToken = async (req, res) => {
  let { token } = req.body;
  console.log("VERIFYING USER", req.auth);
  id = req.auth._id;
  try {
    let user = await User.findByIdAndUpdate(
      id,
      { role: 2 },
      {
        safe: true,
        useFindAndModify: false,
      }
    );
    return res.status(200).json({ user });
  } catch (err) {
    console.log("VERIFY ERROR", err);
    return res.status(400).json({ error: err });
  }
};

exports.ForgotPasswordMail = (req, res) => {
  //////// dont forget to pass customer name and CustId is login from frontend
  console.log(req.body);
  const { email } = req.body;
  let token = null;
  //  GENERATTING TOKEN
  console.log("generating forgot pass email ", email);

  User.find({ email: email }, (err, user) => {
    if (err || !user[0]) {
      console.log("email no exist ");
      return res.status(400).json({
        error: "USER email does not exists",
      });
    }
    console.log(user[0]);

    //create token
    token = jwt.sign(
      { _id: user[0]._id, role: user[0].role },
      process.env.SECRET
    );
    console.log("TOKEN:", token);
    //put token in cookie
    res.cookie("token", token, { expire: new Date() + 9999 });
    let link = `http://localhost:3000/resetpassword/${token}`;

    let output = `
   <h3> Hello ${email} </h3>
      <p>As per your request we are sending the link to reset you password</p>
      <p>Click the following link to reset your password: <a target="_" href="${link}">Reset Password </a></p>
      <p>Cheers,</p>
      <p>Crypto Funnel Team</p>
  `;
    console.log("LINK", link);
    // create reusable transporter object using the default SMTP transport
    let transporter = nodemailer.createTransport({
      host: "smtp.gmail.com",
      port: 587,
      secure: false,
      auth: {
        user: "infocareenquiry@gmail.com",
        pass: "infocare12345",
      },
      tls: {
        rejectUnauthorized: false,
      },
    });

    // setup email data with unicode symbols
    let mailOptions = {
      from: '"Crypto Funnel" <infocareenquiry@gmail.com>', // sender address
      to: email, // list of receivers
      subject: "Email Verification", // Subject line
      text: req.body.message, // plain text body
      html: output, // html body
    };

    // send mail with defined transport object
    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        console.log(error);
        return res.send(error);
      }
      console.log("Message sent: %s", info.messageId);
      console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
    });
    return res.status(200).json({ note: "success" });
  });
};

exports.resetPassword = async (req, res) => {
  let { pass } = req.body;
  console.log("REST PASS FOR USER", req.auth);
  id = req.auth._id;
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
