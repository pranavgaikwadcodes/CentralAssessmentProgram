const mongoose = require("mongoose");

const billingDetailsSchema = mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
  usernID: { type: String, require: true },
  email: { type: String, require: true },
  name: { type: String, require: true },
  payment_status: {type: String, require: true, default: 'pending'},
  payment_method: {type: String,},
  transaction_id: {type: String,},
  transaction_day_date: {type: String,},
});

module.exports = mongoose.model("billing-details", billingDetailsSchema);