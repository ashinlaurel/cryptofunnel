// import Stripe from "stripe";
const Stripe = require("stripe");
const paymentHistory = require("../../models/paymentHistory");
const refferal = require("../../models/refferal");
const user = require("../../models/user");

// app.use(express.static("."));

const YOUR_DOMAIN = "http://localhost:3000/app/ConfirmPayment";

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

const products = [
  {
    price_data: {
      currency: "usd",
      product_data: {
        name: "Crypto 101",
        images: ["https://i.imgur.com/EHyR2nP.png"],
      },
      unit_amount: 17500,
    },
    quantity: 1,
  },
  {
    price_data: {
      currency: "usd",
      product_data: {
        name: "Crypto 201",
        images: ["https://i.imgur.com/EHyR2nP.png"],
      },
      unit_amount: 25000,
    },
    quantity: 1,
  },
  {
    price_data: {
      currency: "usd",
      product_data: {
        name: "Signals & Analysis",
        images: ["https://i.imgur.com/EHyR2nP.png"],
      },
      unit_amount: 10000,
    },
    quantity: 1,
  },
];

exports.paymentResolver = async (req, res) => {
  const { plannumber } = req.body;
  console.log(plannumber);
  try {
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      line_items: [products[plannumber - 1]],
      mode: "payment",
      // allow_promotion_codes: true,
      success_url: `${YOUR_DOMAIN}/true/{CHECKOUT_SESSION_ID}`,
      cancel_url: `${YOUR_DOMAIN}?canceled=true`,
    });

    // res.set("Access-Control-Allow-Origin", "*");
    res.status(200).send(session.url);
    // res.redirect(303, session.url);
  } catch (err) {
    res.status(500).json({ statusCode: 500, message: err.message });
  }
};

exports.confirmpayment = async (req, res) => {
  // console.log("here");
  const { id, sessionId } = req.body;
  // console.log(sessionId);
  try {
    const session = await stripe.checkout.sessions.retrieve(sessionId, {
      expand: ["line_items"],
    });
    const customer = await stripe.customers.retrieve(session.customer);
    const status = session.payment_status;
    const product = session.line_items.data[0];
    console.log(product);
    let payloadstatus = "Failed";
    if (status == "paid") {
      payloadstatus = "Success";
    } else {
      payloadstatus = "Failed";
    }
    // console.log(session);

    // to prevent repetitions count is taken
    const thecount = await paymentHistory.count({ sessionId: session.id });

    if (thecount == 0) {
      const payload = {
        sessionId: session.id,
        customerId: id,
        amountTotal: session.amount_total,
        paymentStatus: payloadstatus,
        planName: product.description,
      };
      const newpayment = new paymentHistory(payload);
      const response = await newpayment.save();

      // -----updating user role and plan -------------
      if (status == "paid") {
        let plannumber = 0;
        switch (product.description) {
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
        // console.log("plan=", plannumber);
        await user.findByIdAndUpdate(
          { _id: id },
          { role: 3, plan: plannumber }
        );
      }
    }

    // console.log(session.payment_status);
    res.status(200).send({ message: "success" });
  } catch (err) {
    res.status(500).json({ statusCode: 500, message: err.message });
  }
};

exports.getAllPayHist = (req, res) => {
  let { pages, filters } = req.body;

  let { searchquery } = filters;
  // console.log(filters);
  // console.log(searchquery);
  // console.log(searchtype);
  const fuzzyquery = new RegExp(escapeRegex(searchquery), "gi");

  let options = {
    populate: "customerId",
    page: pages.page,
    limit: pages.limit,
  };

  let filteroptions = {
    // product: { brand: "IBM" },
  };

  // ---Conditional Addition of filters
  if (filters.plan != "") {
    filteroptions.plan = filters.plan;
  }
  if (filters.customerId != "") {
    filteroptions.customerId = filters.customerId;
  }

  if (filters.searchquery != "") {
    filteroptions.customerId.name = fuzzyquery;
  }

  // -----------------------------------------------------------------------

  paymentHistory.paginate(filteroptions, options, function (err, result) {
    // console.log(result);
    if (err || !result) {
      return res.status(400).json({
        error: "No items found",
        err: err,
      });
    }
    // console.log(result.docs);
    result.docs.map((doc) => {
      (doc.encry_password = ""), (doc.salt = "");
    });
    let output = {
      total: result.total,
      out: result.docs,
    };
    return res.status(200).json(output);
  });
};

// -----------------------Fuzzy Search Regex----------------
function escapeRegex(text) {
  return text.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, "\\$&");
}
