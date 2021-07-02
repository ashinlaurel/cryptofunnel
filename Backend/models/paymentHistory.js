var mongoose = require("mongoose");
var mongoosePaginate = require("mongoose-paginate");

var paymentHistorySchema = new mongoose.Schema(
  {
    sessionId: {
      type: String,
      required: true,
    },
    customerId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    amountTotal: {
      type: String,
      required: true,
    },
    paymentStatus: {
      type: String,
      required: true,
    },
    planName: {
      type: String,
      required: true,
    },
    // refCode: {
    //   type: String,
    //   maxlength: 32,
    //   trim: true,
    //   unique: true,
    // },
    // discount: {
    //   type: String,
    //   maxlength: 2,
    // },
    // reffIds: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
  },
  { timestamps: true }
);
paymentHistorySchema.plugin(mongoosePaginate);

module.exports = mongoose.model("PaymentHistory", paymentHistorySchema);
