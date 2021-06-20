const UserInfo = require("../models/userInfo");

exports.getUserById = (req, res) => {
  // console.log(req.body);
  UserInfo.find({ userId: req.body.id })
    .populate("userId")
    .exec((err, user) => {
      if (err) {
        return res.status(400).json({
          error: "No user found",
        });
      }
      // console.log(user);
      return res.json(user);
    });
};

exports.updateUser = (req, res) => {
  UserInfo.findByIdAndUpdate(
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
