var Webhook = require("coinbase-commerce-node").Webhook;
const paymentHistory = require("../models/paymentHistory");
const refferal = require("../models/refferal");
const user = require("../models/user");

exports.rawBody = (req, res, next) => {
  req.setEncoding("utf8");
  console.log("middleware working");
  // next();

  var data = "";

  req.on("data", function (chunk) {
    data += chunk;
  });

  req.on("end", function () {
    req.rawBody = data;
    next();
  });
};

exports.coinbaseConfirmPayment = async (request, response) => {
  // const rawBody = req.rawBody;
  // const signature = req.headers["x-cc-webhook-signature"];
  // const webhookSecret = `${process.env.WEBHOOK_SECRET}`;
  const webhookSecret = "219d37cd-8d83-40f7-bec8-378bd51cada1";

  // console.log("printing:", request);

  var event;

  // console.log(request.headers);
  // console.log(request.rawBody);

  try {
    event = Webhook.verifyEventBody(
      request.rawBody,
      request.headers["x-cc-webhook-signature"],
      webhookSecret
    );
    console.log("The event", event);

    if (event.type === "charge:created") {
      console.log("Charge Created");
      // console.log(metadata, event.metadata);
      const payload = {
        sessionId: event.data.id,
        customerId: event.data.metadata.user,
        amountTotal: event.data.metadata.finalamount,
        paymentStatus: "Payment Initiated",
        planName: event.data.name,
        curr: "USD",
        refCode: event.data.metadata.refCode,
        discount: event.data.metadata.discount,
        method: "coinbase",
      };

      const newpayment = new paymentHistory(payload);
      const response = await newpayment.save();
    }

    if (event.type === "charge:pending") {
      console.log("Charge Pending");
      let paymenthistory = await paymentHistory.findOneAndUpdate(
        {
          sessionId: event.data.id,
          customerId: event.data.metadata.user,
        },
        { paymentStatus: "Payment Pending" }
      );
    }

    if (event.type === "charge:confirmed") {
      console.log("Charge Confirmed");

      // payment update
      let paymenthistory = await paymentHistory.findOneAndUpdate(
        {
          sessionId: event.data.id,
          customerId: event.data.metadata.user,
        },
        { paymentStatus: "Success" }
      );

      // handling refferal code creator payable amount

      if (event.data.metadata.refCode != "") {
        let codedata = await refferal.findOne({
          refCode: event.data.metadata.refCode,
        });

        if (codedata._id != "") {
          // updating the influncer account
          await user.findByIdAndUpdate(
            { _id: codedata.creatorId },
            { $inc: { payable: event.data.metadata.payable } }
          );
        }
      }

      // updating roles
      let plannumber = 0;
      switch (event.data.name) {
        case "Crypto 101":
          plannumber = 1;
          break;
        case "Crypto 201":
          plannumber = 2;
          break;
        case "Signals & Analysis":
          plannumber = 3;
          break;

        default:
          break;
      }

      // updating the buyers account
      await user.findByIdAndUpdate(
        { _id: event.data.metadata.user },
        { role: 3, plan: plannumber }
      );
    }

    if (event.type === "charge:failed") {
      console.log("Charge Failed");

      let paymenthistory = await paymentHistory.findOneAndUpdate(
        {
          sessionId: event.data.id,
          customerId: event.data.metadata.user,
        },
        { paymentStatus: "Payment Failed" }
      );

      // updating the buyers account
      await user.findByIdAndUpdate(
        { _id: event.data.metadata.user },
        { role: 2, plan: 0 }
      );

      // TODO
      // charge failed or expired
    }
  } catch (error) {
    console.log("Error occured", error.message);

    return response.status(400).send("Webhook Error:" + error.message);
  }

  console.log("Success", event.id);
  response.status(200).send("Signed Webhook Received: " + event.id);
};
