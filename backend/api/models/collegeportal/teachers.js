const mongoose = require("mongoose");

const teachersDetailsSchema = mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
  college_code: { type: String, require: true },
  department: { type: String, require: true },
  name: { type: String, require: true },
  designation: { type: String, require: true },
  college_email: { type: String, require: true },
  contact: { type: String, require: true },
});

module.exports = mongoose.model("teachers-details", teachersDetailsSchema);
