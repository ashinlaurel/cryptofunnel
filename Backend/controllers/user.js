const User = require("../models/user");

exports.getUserById = (req, res, next, id) => {
  User.findById(id).exec((err, user) => {
    if (err || !user) {
      return res.status(400).json({
        error: "No user was found in DB",
      });
    }
    req.profile = user;
    next();
  });
};
exports.getAllUsers = (req, res) => {
  let { pages, filters } = req.body;

  let { searchquery } = filters;
  // console.log(filters);
  // console.log(searchquery);
  // console.log(searchtype);
  const fuzzyquery = new RegExp(escapeRegex(searchquery), "gi");

  let options = {
    // populate: "product",
    page: pages.page,
    limit: pages.limit,
  };

  let filteroptions = {
    // product: { brand: "IBM" },
  };
  console.log(filters.plan);
  // ---Conditional Addition of filters
  if (filters.plan && filters.plan != "") {
    console.log("HERE");
    filteroptions.plan = filters.plan;
  }
  if (filters.role != "") {
    filteroptions.role = filters.role;
  }

  if (filters.InfulencerRequest && filters.InfulencerRequest == true) {
    filteroptions.InfulencerRequest = true;
  }

  if (filters.searchquery != "") {
    filteroptions.name = fuzzyquery;
  }
  console.log(filteroptions);
  // -----------------------------------------------------------------------

  User.paginate(filteroptions, options, function (err, result) {
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

exports.getUser = (req, res) => {
  req.profile.salt = undefined;
  req.profile.encry_password = undefined;
  return res.json(req.profile);
};

exports.updateUser = (req, res) => {
  User.findByIdAndUpdate(
    { _id: req.profile._id },
    { $set: req.body },
    { new: true, useFindAndModify: false },
    (err, user) => {
      if (err) {
        return res.status(400).json({
          error: "You are not authorized to update this user",
        });
      }
      user.salt = undefined;
      user.encry_password = undefined;
      res.json(user);
    }
  );
};

exports.userPurchaseList = (req, res) => {
  Order.find({ user: req.profile._id })
    .populate("user", "_id name")
    .exec((err, order) => {
      if (err) {
        return res.status(400).json({
          error: "No Order in this account",
        });
      }
      return res.json(order);
    });
};

exports.pushOrderInPurchaseList = (req, res, next) => {
  let purchases = [];
  req.body.order.products.forEach((product) => {
    purchases.push({
      _id: product._id,
      name: product.name,
      description: product.description,
      category: product.category,
      quantity: product.quantity,
      amount: req.body.order.amount,
      transaction_id: req.body.order.transaction_id,
    });
  });

  //store thi in DB
  User.findOneAndUpdate(
    { _id: req.profile._id },
    { $push: { purchases: purchases } },
    { new: true },
    (err, purchases) => {
      if (err) {
        return res.status(400).json({
          error: "Unable to save purchase list",
        });
      }
      next();
    }
  );
};

//request Influencer

exports.setInfulencerRequest = async (req, res) => {
  id = req.auth._id;
  try {
    let user = await User.findByIdAndUpdate(
      id,
      { InfulencerRequest: true },
      {
        safe: true,
        useFindAndModify: false,
      }
    );
    console.log("STATUS SET");
    return res.status(200).json({ user });
  } catch (err) {
    console.log(" ERROR", err);
    return res.status(400).json({ error: err });
  }
};

exports.AcceptInfluencer = async (req, res) => {
  id = req.body.id;
  try {
    let user = await User.findByIdAndUpdate(
      id,
      { role: 4 },
      {
        safe: true,
        useFindAndModify: false,
      }
    );
    console.log("STATUS SET");
    return res.status(200).json({ user });
  } catch (err) {
    console.log(" ERROR", err);
    return res.status(400).json({ error: err });
  }
};

// -----------------------Fuzzy Search Regex----------------
function escapeRegex(text) {
  return text.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, "\\$&");
}
