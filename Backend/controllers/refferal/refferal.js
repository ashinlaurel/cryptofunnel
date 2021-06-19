let referralCodeGenerator = require("referral-code-generator");
const Refferal = require("../../models/refferal");

exports.createNewRefferal = async (req, res) => {
  try {
    console.log("hello");
    // console.log(req.body);
    let { creatorId } = req.body;
    let thecode = referralCodeGenerator.alphaNumeric("lowercase", 2, 2);
    console.log(thecode);
    let payload = { creatorId: creatorId, refCode: thecode };

    const newrefferal = new Refferal(payload);
    let response = newrefferal.save();

    res.status(200).send(thecode);
  } catch (err) {
    res.status(500).json({ statusCode: 500, message: err.message });
  }
};
exports.getByUser = async (req, res) => {
  let { pages, filters } = req.body;

  // let { searchquery } = filters;
  // console.log(filters);
  // console.log(searchquery);
  // console.log(searchtype);
  // const fuzzyquery = new RegExp(escapeRegex(searchquery), "gi");

  let options = {
    // populate: "product",
    page: pages.page,
    limit: pages.limit,
  };

  let filteroptions = {
    // product: { brand: "IBM" },
  };

  // ---Conditional Addition of filters
  if (filters.type != "") {
    filteroptions.creatorId = filters.creatorId;
  }

  // if (filters.searchquery != "") {
  //   filteroptions.sno = fuzzyquery;
  // }

  // -----------------------------------------------------------------------

  Refferal.paginate(filteroptions, options, function (err, result) {
    // console.log(result);
    if (err || !result) {
      return res.status(400).json({
        error: "No items found",
        err: err,
      });
    }
    // console.log(result.docs);
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
