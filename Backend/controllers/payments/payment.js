// import Stripe from "stripe";
const Stripe = require("stripe");
const { Client, resources } = require("coinbase-commerce-node");
const paymentHistory = require("../../models/paymentHistory");
const refferal = require("../../models/refferal");
const user = require("../../models/user");
const logo = require("../../");
const e = require("express");

// app.use(express.static("."));

// const YOUR_DOMAIN = "https://thecfsquad.com/app/ConfirmPayment";

const stripe = new Stripe(process.env.SECRET_KEY);
Client.init(process.env.COINBASE_API);

const { Charge } = resources;

const plans = { 1: 1, 2: 250, 3: 100 };
const indplans = { 1: 13000, 2: 18500, 3: 7500 };

const discReff = {
  "Crypto 101": 175,
  "Crypto 201": 250,
  "Signals & Analysis": 100,
};

let products = [
  {
    price_data: {
      currency: "usd",
      product_data: {
        name: "Crypto 101",
        images: ["https://i.imgur.com/7JApXKO.png"],
      },
      unit_amount: 5000,
    },
    quantity: 1,
  },
  {
    price_data: {
      currency: "usd",
      product_data: {
        name: "Crypto 201",
        images: ["https://i.imgur.com/7JApXKO.png"],
      },
      unit_amount: 8000,
    },
    quantity: 1,
  },
  {
    price: process.env.SIGANDANALPRICEID,
    quantity: 1,
  },
];

let bitproducts = [
  {
    name: "Crypto 101",
    description: "Crypto 101",
    local_price: {
      amount: 1.0,
      currency: "USD",
    },
    pricing_type: "fixed_price",
    metadata: {
      user: "jeffd23",
      refCode: "",
      refUsed: "false",
      finalamount: "",
      discount: "0",
      payable: 0,
    },
    redirect_url: `${process.env.FRONTEND_DOMAIN}`,
    cancel_url: `${process.env.FRONTEND_DOMAIN}`,
  },
  {
    name: "Crypto 201",
    description: "Crypto 201",
    local_price: {
      amount: 250.0,
      currency: "USD",
    },
    pricing_type: "fixed_price",
    metadata: {
      user: "jeffd23",
      refCode: "",
      refUsed: "false",
      finalamount: "",
      discount: "0",
      payable: 0,
    },
    redirect_url: `${process.env.FRONTEND_DOMAIN}`,
    cancel_url: `${process.env.FRONTEND_DOMAIN}`,
  },
  {
    name: "Signals & Analysis",
    description: "Signals & Analysis",
    local_price: {
      amount: 100.0,
      currency: "USD",
    },
    pricing_type: "fixed_price",
    metadata: {
      user: "jeffd23",
      refCode: "",
      refUsed: "false",
      finalamount: "",
      discount: "0",
      payable: 0,
    },
    redirect_url: `${process.env.FRONTEND_DOMAIN}`,
    cancel_url: `${process.env.FRONTEND_DOMAIN}`,
  },
];

exports.paymentResolver = async (req, res) => {
  const { plannumber, codeStatus, country } = req.body;
  let { thecode } = req.body;
  console.log(plannumber);
  console.log("codeStatus", codeStatus);
  console.log("thecode", thecode);

  // ---- refferal code apply-----

  let finalamount = 0;
  let discount = 0;

  if (thecode != "" && codeStatus == true) {
    // get discount %
    let codedata = await refferal.findOne({ refCode: thecode });

    console.log(codedata);

    if (codedata.discount != "") {
      discount = parseInt(codedata.discount);
    }
  }
  if (plannumber <= 2) {
    if (country == "notIN") {
      finalamount = plans[plannumber] * (1 - discount / 100);
      finalamount *= 100;
      products[plannumber - 1].price_data.unit_amount = finalamount;
    } else {
      finalamount = indplans[plannumber] * (1 - discount / 100);
      finalamount *= 100;
      products[plannumber - 1].price_data.unit_amount = finalamount;
      products[plannumber - 1].price_data.currency = "inr";
    }
  }

  console.log(discount, finalamount);

  // --------------------------------------
  if (thecode == "") {
    thecode = "00000";
  }

  try {
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      line_items: [products[plannumber - 1]],
      mode: plannumber == 3 ? "subscription" : "payment",
      // allow_promotion_codes: true,
      success_url: `${process.env.FRONTEND_DOMAIN}/ConfirmPayment/true/{CHECKOUT_SESSION_ID}/${thecode}/${codeStatus}`,
      cancel_url: `${process.env.FRONTEND_DOMAIN}/ConfirmPayment/paymentfailed`,
    });

    // res.set("Access-Control-Allow-Origin", "*");
    res.status(200).send(session.url);
    // res.redirect(303, session.url);
  } catch (err) {
    res.status(500).json({ statusCode: 500, message: err.message });
  }
};
exports.paymentResolverBit = async (req, res) => {
  const { plannumber, codeStatus, country, userid } = req.body;
  let { thecode } = req.body;
  console.log(plannumber);
  console.log("codeStatus", codeStatus);
  console.log("thecode", thecode);
  console.log("userid:", userid);

  // ---- refferal code apply-----

  let finalamount = 0;
  let discount = 0;

  if (thecode != "" && codeStatus == true) {
    // get discount %
    let codedata = await refferal.findOne({ refCode: thecode });

    console.log(codedata);

    if (codedata.discount != "") {
      bitproducts[plannumber - 1].metadata.refCode = thecode;
      bitproducts[plannumber - 1].metadata.refUsed = "true";

      discount = parseInt(codedata.discount);
    }
  }

  finalamount = plans[plannumber] * (1 - discount / 100);
  // finalamount *= 100;
  bitproducts[plannumber - 1].local_price.amount = finalamount;

  console.log(discount, finalamount);
  bitproducts[plannumber - 1].metadata.user = userid;
  bitproducts[plannumber - 1].metadata.finalamount = finalamount;
  bitproducts[plannumber - 1].metadata.discount = discount;
  bitproducts[plannumber - 1].metadata.payable =
    plans[plannumber] * (discount / 100);

  // // --------------------------------------
  // if (thecode == "") {
  //   thecode = "00000";
  // }

  try {
    const charge = await Charge.create(bitproducts[plannumber - 1]);
    console.log(charge);
    // res.set("Access-Control-Allow-Origin", "*");
    res.status(200).send(charge);
    // res.redirect(303, session.url);
  } catch (err) {
    res.status(500).json({ statusCode: 500, message: err.message });
  }
  // res.status(200).json({ status: "good" });
};

exports.confirmpayment = async (req, res) => {
  // console.log("here");
  const { id, sessionId, refCode, refStatus } = req.body;
  // console.log(sessionId, refCode, refStatus);
  // let output = [];
  let outproduct = [];
  let outcustomer = [];
  try {
    const session = await stripe.checkout.sessions.retrieve(sessionId, {
      expand: ["line_items"],
    });
    // output = session;

    const customer = await stripe.customers.retrieve(session.customer);
    const status = session.payment_status;
    const product = session.line_items.data[0];
    console.log(product);
    outproduct = product;
    outcustomer = customer;
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
      // payable for influencers variables
      let addPayable = 0;
      let thedisc = 0;
      let theamt = 0;

      const payload = {
        sessionId: session.id,
        customerId: id,

        amountTotal: session.amount_total,
        paymentStatus: payloadstatus,
        planName: product.description,
        curr: product.currency,
        refCode: "",
        discount: "",
        method: "stripe",
      };
      // get refferal code data
      if (refStatus == "true") {
        let codedata = await refferal.findOne({ refCode: refCode });
        // console.log(
        //   "------------------code data-----------------------",
        //   codedata
        // );
        if (codedata._id != "") {
          payload.discount = codedata.discount;
          payload.refCode = refCode;

          // setting up payable amount
          thedisc = parseFloat(payload.discount);
          thedisc /= 100;
          theamt = parseFloat(discReff[product.description]);

          addPayable = theamt * thedisc;

          console.log("thedisc", thedisc);
          console.log("theamt", theamt);
          console.log("thepayable", addPayable);
          // updating the influncer account
          await user.findByIdAndUpdate(
            { _id: codedata.creatorId },
            { $inc: { payable: addPayable } }
          );
        }
      }

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

        // updating the buyers account
        await user.findByIdAndUpdate(
          { _id: id },
          { role: 3, plan: plannumber, stripeCustomerId: customer.id }
        );
      }
    }

    // console.log("Customer", customer);
    res
      .status(200)
      .send({ message: "success", product: outproduct, customer: outcustomer });
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
    sort: { createdAt: -1 },
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

  //date
  if (filters.toDate != "" && filters.fromDate != "") {
    filteroptions.createdAt = {
      $gte: filters.fromDate,
      $lt: filters.toDate,
    };
  } else if (filters.fromDate != "") {
    filteroptions.createdAt = {
      $gte: filters.fromDate,
    };
  } else if (filters.toDate != "") {
    filteroptions.createdAt = {
      $lt: filters.toDate,
    };
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

exports.getPaymentIntent = async (req, res) => {
  try {
    const { plan, refCode, billingDetails } = req.body;
    let theuser = req.auth;
    // console.log(refCode);
    // console.log(req.auth);

    let finalamount = 0;
    let discount = 0;

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

exports.getMangeSubscriptionURL = async (req, res) => {
  const { id } = req.body;
  const returnUrl = `${process.env.FRONTEND_DOMAIN}/myplan`;
  // console.log(id);

  try {
    let users = await user.findById(id).exec();
    // let user = users[0];
    const customerId = users.stripeCustomerId;
    // console.log(users);
    const portalSession = await stripe.billingPortal.sessions.create({
      customer: customerId,
      return_url: returnUrl,
    });
    return res.status(200).json(portalSession);
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
};

// -----------------------Fuzzy Search Regex----------------
function escapeRegex(text) {
  return text.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, "\\$&");
}
