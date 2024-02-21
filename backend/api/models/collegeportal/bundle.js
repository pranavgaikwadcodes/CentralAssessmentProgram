const mongoose = require("mongoose");

const bundleDetailsSchema = mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
  department: { type: String, require: true },
  bundle_ID: { type: String, require: true },
  subject: { type: String, require: true },
  pattern: { type: String, require: true },
  bundle_number: { type: String, require: true },
  number_of_bundles_for_this_subject: { type: String, require: true },
  number_of_papers_in_bundle: { type: String, require: true },
  bundle_status: {type: String},
  assigned_to: {type: String}, // we can give card id here
});

module.exports = mongoose.model("bundle-details", bundleDetailsSchema);
