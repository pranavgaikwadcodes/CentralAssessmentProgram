const mongoose = require("mongoose");

const examinerProfileDetailsSchema = mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,

  userID: { type: String, require: true }, // dynamically generated
  email: { type: String, require: true },
  password: { type: String, require: true },
  card_number: { type: String },
    
  name: { type: String, require: true },
  phone: { type: String, require: true },
  college_name: { type: String, require: true },
  college_code: { type: String, require: true },
  experience: { type: String, require: true },
  branch: { type: String, require: true },
  PAN_card_number: { type: String, require: true },
  bank_IFSC_code: { type: String, require: true },
  bank_account_number: { type: String, require: true },
  UPI_id: { type: String, require: true },

  role: {type: String, require: true, default: 'examiner'}, // can be changed to moderator

});

module.exports = mongoose.model("examiner-profile-details", examinerProfileDetailsSchema);