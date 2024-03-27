const mongoose = require("mongoose");

const departmentDetailsSchema = mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
  college_code: {type: String, require: true},
  name: { type: String, require: true },
  branches: {type: String, require: true},
  hod: {type: String, require: true},
  hod_email: {type: String, require: true},
  hod_contact: {type: String, require: true},

  // ================================ //
  // these details should be filled on department login
  student_count_firstyear: {type: String},
  student_count_secondyear: {type: String},
  student_count_thirdyear: {type: String},
  student_count_fourthyear: {type: String},

  subject_count_firstyear: {type: String},
  subject_count_secondyear: {type: String},
  subject_count_thirdyear: {type: String},
  subject_count_fourthyear: {type: String},

  teachers_count: {type: String},
  // ================================ //
  
  department_username: {type: String, require: true},
  department_password: {type: String, require: true},
});

module.exports = mongoose.model("department-details", departmentDetailsSchema);
