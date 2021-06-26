// import Stripe from "stripe";
const Stripe = require("stripe");
const refferal = require("../../models/refferal");

const stripe = new Stripe(process.env.SECRET_KEY);

const plans = { 1: 100, 2: 500, 3: 1000 };

exports.getPaymentIntent = async (req, res) => {
  try {
    const { plan, refCode, billingDetails } = req.body;
    let theuser = req.auth;
    // console.log(refCode);
    // console.log(req.auth);

    let finalamount = 0;
    let discount = 0;

    // Psst. For production-ready applications we recommend not using the
    // amount directly from the client without verifying it first. This is to
    // prevent bad actors from changing the total amount on the client before
    // it gets sent to the server. A good approach is to send the quantity of
    // a uniquely identifiable product and calculate the total price server-side.
    // Then, you would only fulfill orders using the quantity you charged for.
    if (refCode != "") {
      // get discount %
      let thecode = await refferal.findOne({ refCode: refCode });

      console.log(thecode);

      if (thecode.discount != "" && theuser._id != thecode.creatorId) {
        discount = parseInt(thecode.discount);
      }
    }

    finalamount = plans[plan] * (1 - discount / 100);
    finalamount *= 100;
    console.log(discount, finalamount);

    const paymentIntent = await stripe.paymentIntents.create({
      description: "payment crypto",

      shipping: billingDetails,
      amount: finalamount,
      currency: "usd",
      payment_method_types: ["card"],
    });

    // const paymentIntent = { client_secret };

    res.status(200).send(paymentIntent.client_secret);
    // res.status(200).send(finalamount);
  } catch (err) {
    res.status(500).json({ statusCode: 500, message: err.message });
  }
};
