const mongoose = require("mongoose");

const examinerPaymentDetailsSchema = mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
  userID: { type: String, require: true },
  email: { type: String, require: true },
  name: { type: String, require: true },
  payment_status: {type: String, require: true, default: 'pending'},
  payment_method: {type: String,},
  transaction_id: {type: String,},
  transaction_day_date: {type: String,},

  reciever_upiID:{type: String,},
  amount:{type: String,},
});

module.exports = mongoose.model("examiner-payment-details", examinerPaymentDetailsSchema);