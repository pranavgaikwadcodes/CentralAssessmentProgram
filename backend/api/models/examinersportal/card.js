const mongoose = require("mongoose");

const cardDetailsSchema = mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,

  usernID: { type: String, require: true }, // dynamically generated
  email: { type: String, require: true },
  name: { type: String, require: true },
  role: {type: String, require: true, default: 'examiner'}, // can be changed to moderator

  card_number: { type: String, require: true }, // will be auto generated
  subject_code: { type: String, require: true },
  bundle_number: { type: String, require: true },
  number_of_papers_in_bundle: { type: String, require: true },
  branch: { type: String, require: true },
  card_issue_date_time: { type: String, require: true },
  bundle_issue_date_time: { type: String, require: true },
  bundle_status: { type: String, require: true, default: 'pending'},
});

module.exports = mongoose.model("examiner-card-details", cardDetailsSchema);
