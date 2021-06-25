var mongoose = require("mongoose");
var mongoosePaginate = require("mongoose-paginate");

var refferalSchema = new mongoose.Schema(
  {
    creatorId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    creatorName: {
      type: String,
      required: true,
    },
    refCode: {
      type: String,
      maxlength: 32,
      trim: true,
      unique: true,
    },
    discount: {
      type: String,
      maxlength: 2,
    },
    reffIds: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
  },
  { timestamps: true }
);
refferalSchema.plugin(mongoosePaginate);

module.exports = mongoose.model("Refferal", refferalSchema);
