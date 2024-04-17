const mongoose = require("mongoose");

const cardDetailsSchema = mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,

  userID: { type: String, require: true },
  email: { type: String, require: true },
  name: { type: String, require: true },
  role: {type: String, require: true, default: 'examiner'}, // can be changed to moderator

  card_number: { type: String, require: true }, // will be auto generated
  subject_code: { type: String,},
  bundle_number: { type: String,},
  number_of_papers_in_bundle: { type: String,},
  branch: { type: String,},
  card_issue_date_time: { type: String, require: true ,default: Date.now},
  bundle_issue_date_time: { type: String },
  bundle_status: { type: String, require: true, default: 'pending'},
});

module.exports = mongoose.model("examiner-card-details", cardDetailsSchema);
