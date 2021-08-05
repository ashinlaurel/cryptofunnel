var Webhook = require("coinbase-commerce-node").Webhook;
const paymentHistory = require("../models/paymentHistory");
const refferal = require("../models/refferal");
const user = require("../models/user");
const Stripe = require("stripe");
const stripe = new Stripe(process.env.SECRET_KEY);

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
      console.log("Charge Create+d");
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

exports.stripeWebhook = async (req, res) => {
  let data;
  let eventType;
  // Check if webhook signing is configured.
  const webhookSecret = process.env.STRIPE_SIGNIN_SECRET;

  if (webhookSecret) {
    // Retrieve the event by verifying the signature using the raw body and secret.
    let event;
    let signature = req.headers["stripe-signature"];
    // console.log(`req.body`, req.rawBody);

    try {
      event = stripe.webhooks.constructEvent(
        req.rawBody,
        signature,
        webhookSecret
      );
    } catch (err) {
      console.log(`⚠️  Webhook signature verification failed.`, err);
      return res.sendStatus(400);
    }
    // Extract the object from the event.
    data = event.data;
    eventType = event.type;
  } else {
    // Webhook signing is recommended, but if the secret is not configured in `config.js`,
    // retrieve the event data directly from the request body.
    data = req.rawBody.data;
    eventType = req.rawBody.type;
  }
  // console.log("eventType", eventType, data);

  switch (eventType) {
    case "customer.subscription.deleted":
      let customerId = data.object.customer;
      // customerId = "0"; //........................................................
      try {
        let updateuser = await user.findOneAndUpdate(
          { stripeCustomerId: customerId },
          { role: 2, plan: 0, stripeCustomerId: "0" },
          {
            safe: true,
            useFindAndModify: false,
            returnOriginal: false,
          }
        );
        if (updateuser == null) {
          console.log("Cancel failed", updateuser);
          return;
        }

        const payload = {
          sessionId: "Nil",
          customerId: updateuser._id,
          amountTotal: "0",
          paymentStatus: "Cancelled",
          planName: "Signals & Analysis",
          curr: "",
          refCode: "",
          discount: "0",
          method: "stripe",
        };
        const newpayment = new paymentHistory(payload);
        await newpayment.save();
        console.log("CANCELLED Successfully");
        // return res.status(200).json(portalSession);
      } catch (err) {
        console.log("ERROR", err);
      }

      break;
    case "checkout.session.completed":
      // Payment is successful and the subscription is created.
      // You should provision the subscription and save the customer ID to your database.
      break;
    case "invoice.paid":
      // Continue to provision the subscription as payments continue to be made.
      // Store the status in your database and check when a user accesses your service.
      // This approach helps you avoid hitting rate limits.
      break;
    case "invoice.payment_failed":
      // The payment failed or the customer does not have a valid payment method.
      // The subscription becomes past_due. Notify your customer and send them to the
      // customer portal to update their payment information.
      break;
    default:
    // Unhandled event type
  }

  res.sendStatus(200);
};
