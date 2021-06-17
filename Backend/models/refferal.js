var mongoose = require("mongoose");

var refferalSchema = new mongoose.Schema(
  {
    creatorId: {
      type: String,
      required: true,
      maxlength: 32,
      trim: true,
    },
    refCode: {
      type: String,
      maxlength: 32,
      trim: true,
    },
    refferedIds: {
      type: String,
      trim: true,
      required: true,
      unique: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Refferal", refferalSchema);
