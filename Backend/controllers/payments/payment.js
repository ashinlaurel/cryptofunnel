// import Stripe from "stripe";
const Stripe = require("stripe");

const stripe = new Stripe(process.env.SECRET_KEY);

exports.getPaymentIntent = async (req, res) => {
  try {
    const { amount, billingDetails } = req.body;
    console.log(amount);
    // Psst. For production-ready applications we recommend not using the
    // amount directly from the client without verifying it first. This is to
    // prevent bad actors from changing the total amount on the client before
    // it gets sent to the server. A good approach is to send the quantity of
    // a uniquely identifiable product and calculate the total price server-side.
    // Then, you would only fulfill orders using the quantity you charged for.

    const paymentIntent = await stripe.paymentIntents.create({
      description: "payment crypto",

      shipping: billingDetails,
      amount: amount,
      currency: "inr",
      payment_method_types: ["card"],
    });

    // const paymentIntent = { client_secret };

    res.status(200).send(paymentIntent.client_secret);
  } catch (err) {
    res.status(500).json({ statusCode: 500, message: err.message });
  }
};
