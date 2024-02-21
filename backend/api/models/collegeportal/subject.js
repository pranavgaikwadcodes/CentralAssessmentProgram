const mongoose = require("mongoose");

const subjectDetailsSchema = mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
  department: { type: String, require: true },
  subject_name: { type: String, require: true },
  subject_code: { type: String, require: true },
  subject_type: { type: String, require: true },
  pattern: { type: String, require: true },
});

module.exports = mongoose.model("subject-details", subjectDetailsSchema);
