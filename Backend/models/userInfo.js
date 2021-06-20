var mongoose = require("mongoose");
var mongoosePaginate = require("mongoose-paginate");

var userSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  phone: String,
  email: String,
  address: String,
  city: String,
  state: String,
  country: String,
  zip: String,
});

userSchema.plugin(mongoosePaginate);

module.exports = mongoose.model("UserInfo", userSchema);
