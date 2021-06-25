const nodemailer = require("nodemailer");

exports.verifyMail = (req, res) => {
  //////// dont forget to pass customer name and CustId is login from frontend
  console.log(req.body);
  const { name, id, email } = req.body;
  let output = `
   <h3> Hello ${name} </h3>
      <p>Thank you for registering at Crypto Funnel. Much Appreciated! Just one last step is laying ahead of you...</p>
      <p>To activate your account please follow this link: <a target="_" href="http://localhost:3000/home">Verify Email </a></p>
      <p>Cheers</p>
      <p>Crypto Funnel Team</p>
  `;

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
};
