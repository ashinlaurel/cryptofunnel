const { response } = require("express");
let referralCodeGenerator = require("referral-code-generator");
const refferal = require("../../models/refferal");

const Refferal = require("../../models/refferal");

exports.getNewCode = async (req, res) => {
  try {
    let thecode = referralCodeGenerator.alphaNumeric("lowercase", 2, 2);
    console.log(thecode);

    res.status(200).send(thecode);
  } catch (err) {
    res.status(500).json({ statusCode: 500, message: err.message });
  }
};
exports.getCodeData = async (req, res) => {
  const { refCode } = req.body;
  try {
    let thecode = await Refferal.findOne({ refCode: refCode });
    console.log(thecode);

    res.status(200).send(thecode);
  } catch (err) {
    res.status(500).json({ statusCode: 500, message: err.message });
  }
};
exports.createNewRefferal = async (req, res) => {
  try {
    // console.log(req.body);
    let { creatorName, creatorId, refCode, discount } = req.body;

    let payload = {
      creatorName: creatorName,
      creatorId: creatorId,
      refCode: refCode,
      discount: discount,
    };
    // console.log("here", payload);

    const newrefferal = new Refferal(payload);
    let response = newrefferal.save();

    res.status(200).send(response);
  } catch (err) {
    res.status(500).json({ statusCode: 500, message: err.message });
  }
};
exports.checkIfExist = async (req, res) => {
  try {
    const { thecode } = req.body;
    let cnt = await refferal.count({ refCode: thecode });
    if (cnt > 0) {
      console.log("found");
      let codedata = await refferal.findOne({ refCode: thecode });
      // console.log(codedata);
      // console.log(req.auth);
      if (codedata.creatorId == req.auth._id) {
        console.log("user using his own code");
        res.status(200).send({ thestatus: false, codeData: {} });
      }
      res.status(200).send({ thestatus: true, codeData: codedata });
    } else {
      console.log("not found");
      res.status(200).send({ thestatus: false, codeData: {} });
    }

    res.status(200).send();
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
  // if (filters.creatorId && filters.creatorId != "") {
  //   filteroptions.creatorId = filters.creatorId;
  // }

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
  // console.log(filteroptions);

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
