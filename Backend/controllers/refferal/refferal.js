let referralCodeGenerator = require("referral-code-generator");

exports.createNewRefferal = async (req, res) => {
  try {
    console.log("hello");
    // console.log(req.body);
    let { creatorId } = req.body;
    let thecode = referralCodeGenerator.alphaNumeric("lowercase", 2, 2);
    console.log(thecode);

    res.status(200).send();
  } catch (err) {
    res.status(500).json({ statusCode: 500, message: err.message });
  }
};
