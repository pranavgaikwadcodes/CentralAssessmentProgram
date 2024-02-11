const mongoose = require("mongoose");

const collegeDetailsSchema = mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
  name: { type: String, require: true },
  center_code: { type: String, require: true },
  college_type: { type: String, require: true },
  college_departments_count: { type: String, require: true },
  address: { type: String, require: true },
  contact: { type: String, require: true },
  email: { type: String, require: true },
  password: { type: String, require: true },
});

module.exports = mongoose.model("college-details", collegeDetailsSchema);
