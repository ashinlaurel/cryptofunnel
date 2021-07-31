require("dotenv").config();

const fs = require("fs");
var unless = require("express-unless");
const http = require("http");
const https = require("https");
const mongoose = require("mongoose");
const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const cors = require("cors");

//My routes
const authRoutes = require("./routes/auth");
const userRoutes = require("./routes/user");
const userInfoRoutes = require("./routes/userInfo");
const paymentRoutes = require("./routes/payments");
const refferalRoutes = require("./routes/refferal");
const mailRoutes = require("./routes/mail");
const webHookRoutes = require("./routes/webhooks");
const { rawBody } = require("./controllers/webhooks");

//DB Connection
mongoose
  .connect(process.env.DATABASE, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
  })
  .then(() => {
    console.log("DB CONNECTED");
  });

//Middlewares
var maybe = function (path, middleware) {
  return function (req, res, next) {
    // console.log(req.path);
    if (path === req.path) {
      console.log("webhookkk");
      return next();
    } else {
      return middleware(req, res, next);
    }
  };
};
app.use(maybe("/api/webhooks/confirmBitPayment", express.json()));
// app.use(express.json().unless({ path: ["/api/webhooks"] }));
// app.use(express.json()).unless({ path: ["/online"] });

app.use(cookieParser());
app.use(cors());
// app.use(rawBody);

//My Routes
app.use("/api", authRoutes);
app.use("/api", userRoutes);
app.use("/api", userInfoRoutes);
// payment routes
app.use("/api/payment", paymentRoutes);
// refferal route
app.use("/api/refferal", refferalRoutes);
app.use("/api/mail", mailRoutes);
app.use("/api/webhooks", webHookRoutes);

// -----ssh keys-------------------------------

// const privateKey1 = fs.readFileSync(
//   "/etc/letsencrypt/live/thecfsquad.com/privkey.pem",
//   "utf8"
// );
// const certificate1 = fs.readFileSync(
//   "/etc/letsencrypt/live/thecfsquad.com/cert.pem",
//   "utf8"
// );
// const ca1 = fs.readFileSync(
//   "/etc/letsencrypt/live/thecfsquad.com/chain.pem",
//   "utf8"
// );
// const credentials1 = {
//   key: privateKey1,
//   cert: certificate1,
//   ca: ca1,
// };

// var server = https.createServer(credentials1, app);

// ------------------------------------------

//PORT
const port = process.env.PORT || 8000;

// //Starting a server production
// server.listen(port, () => {
//   console.log(`app is running at ${port}`);
// });

// Starting a server local
app.listen(port, () => {
  console.log(`app is running at ${port}`);
});
