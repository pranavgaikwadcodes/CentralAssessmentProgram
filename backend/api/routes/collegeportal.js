const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const checkAuth = require("../middleware/check-auth");

// importing modals
const CollegeDetails = require("../models/collegeportal/collegedetails");
const DepartmentDetails = require("../models/collegeportal/departmentdetails");
const BillingDetails = require("../models/collegeportal/billing");
const TeacherDetails = require("../models/collegeportal/teachers");
const SubjectDetails = require("../models/collegeportal/subject");

// =================================================== //
// Fetch College Details
router.get("/collegeDetails/",checkAuth , (req, res, next) => {
  CollegeDetails.find()
    .exec()
    .then((results) => {
      if (!results || results == "" || results.length < 1) {
        return res.status(401).json({
          error: "No data found",
        });
      } else {
        res.status(200).json(results);
      }
    })
    .catch((error) => {
      console.log("Error in Fetching Data from Database");
      res.status(500).json({
        error: error,
      });
    });
});

// update college info
router.patch("/updateCollege/:collegeID",checkAuth , (req, res, next) => {
  const id = req.params.collegeID;
  const updateOps = {};

  for (const ops of req.body) {
    if (ops.propName === "password") {
      // Hash the new password before updating
      const hashedPassword = bcrypt.hashSync(ops.value, 10); // Hash the password with a salt round of 10
      updateOps[ops.propName] = hashedPassword;
    } else {
      updateOps[ops.propName] = ops.value;
    }
  }

  CollegeDetails.updateOne({ _id: id }, { $set: updateOps })
    .exec()
    .then((result) => {
      res.status(200).json({
        message: `Data updated successfully for the college with ID ${id}`,
      });
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({
        error: err,
      });
    });
});

// =================================================== //
// add new department
router.post("/addDepartment/",checkAuth , (req, res, next) => {
  bcrypt.hash(req.body.password, 10, (err, hashedPassword) => {
    if (err) {
      return res.status(500).json({
        error: err,
      });
    }

    const departmentDetails = new DepartmentDetails({
      _id: new mongoose.Types.ObjectId(),
      name: req.body.name,
      branches: req.body.branches,
      hod: req.body.hod,
      hod_email: req.body.hod_email,
      hod_contact: req.body.hod_contact,
      
      student_count_firstyear: req.body.student_count_firstyear,
      student_count_secondyear: req.body.student_count_secondyear,
      student_count_thirdyear: req.body.student_count_thirdyear,
      student_count_fourthyear: req.body.student_count_fourthyear,
      
      subject_count_firstyear: req.body.subject_count_firstyear,
      subject_count_secondyear: req.body.subject_count_secondyear,
      subject_count_thirdyear: req.body.subject_count_thirdyear,
      subject_count_fourthyear: req.body.subject_count_fourthyear,

      teachers_count: req.body.teachers_count,

      department_username: req.body.department_username,
      department_password: req.body.department_password,
    });

    departmentDetails
      .save()
      .then((result) => {
        console.log(result);
        res.status(200).json({
          message: "Department Added To Database",
          department_added: departmentDetails,
        });
      })
      .catch((err) => {
        console.log(err);
        res.status(500).json({
          error: err,
        });
      });
  });
});

// fetch all departments
router.get("/departments/",checkAuth , (req, res, next) => {
  DepartmentDetails.find()
    .exec()
    .then((results) => {
      if (!results || results == "" || results.length < 1) {
        return res.status(401).json({
          error: "No data found",
        });
      } else {
        res.status(200).json(results);
      }
    })
    .catch((error) => {
      console.log("Error in Fetching Data from Database");
      res.status(500).json({
        error: error,
      });
    });
});

// update dept info
router.patch("/updateDepartment/:deptID",checkAuth , (req, res, next) => {
  const id = req.params.deptID;
  const updateOps = {};

  for (const ops of req.body) {
    if (ops.propName === "password") {
      // Hash the new password before updating
      const hashedPassword = bcrypt.hashSync(ops.value, 10); // Hash the password with a salt round of 10
      updateOps[ops.propName] = hashedPassword;
    } else {
      updateOps[ops.propName] = ops.value;
    }
  }

  DepartmentDetails.updateOne({ _id: id }, { $set: updateOps })
    .exec()
    .then((result) => {
      res.status(200).json({
        message: `Data updated successfully for the college detpt. with ID ${id}`,
        result: result,
      });
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({
        error: err,
      });
    });
});

// =================================================== //
// Add Billing Data
router.post("/addBillingData",checkAuth , (req, res, next) => {
  const billingDetails = new BillingDetails({
    _id: new mongoose.Types.ObjectId(),
    userID: req.body.userID,
    email: req.body.email,
    name: req.body.name,
    payment_status: req.body.payment_status,
    payment_method: req.body.payment_method,
    transaction_id: req.body.transaction_id,
    transaction_day_date: req.body.transaction_day_date,
  });

  billingDetails
    .save()
    .then((result) => {
      console.log(result);
      res.status(200).json({
        message: "Billing Added To Database",
        Billing_Details: billingDetails,
      });
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({
        error: err,
      });
    });
})

// Fetch Billing Data
router.get("/billing",checkAuth , (req, res, next) => {
  BillingDetails.find()
    .exec()
    .then((results) => {
      if (!results || results == "" || results.length < 1) {
        return res.status(401).json({
          error: "No data found",
        });
      } else {
        res.status(200).json(results);
      }
    })
    .catch((error) => {
      console.log("Error in Fetching Data from Database");
      res.status(500).json({
        error: error,
      });
    });
});

// =================================================== //
// Add Teacher Data
router.post("/addTeacher", (req, res, next) => {
  const teacherDetails = new TeacherDetails({
    _id: new mongoose.Types.ObjectId(),
    name: req.body.name,
    designation: req.body.designation,
    college_email: req.body.college_email,
    contact: req.body.contact,
  });

  teacherDetails
    .save()
    .then((result) => {
      console.log(result);
      res.status(200).json({
        message: "Teacher Added To Database",
        Teacher_Details: teacherDetails,
      });
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({
        error: err,
      });
    });
})

// Update Teacher Data
router.patch("/updateTeacher/:teacherID", (req, res, next) => {
  const id = req.params.teacherID;
  const updateOps = {};

  for (const ops of req.body) {
    updateOps[ops.propName] = ops.value;
  }

  TeacherDetails.updateOne({ _id: id }, { $set: updateOps })
    .exec()
    .then((result) => {
      res.status(200).json({
        message: `Data updated successfully for the Teacher with ID ${id}`,
        result: result,
      });
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({
        error: err,
      });
    });
})

// =================================================== //
// Add Subject
router.post("/addSubject", (req, res, next) => {
  const subjectDetails = new SubjectDetails({
    _id: new mongoose.Types.ObjectId(),
    department: req.body.department,
    subject_name: req.body.subject_name,
    subject_code: req.body.subject_code,
    subject_type: req.body.subject_type,
    pattern: req.body.pattern,
  });

  subjectDetails
  .save()
    .then((result) => {
      console.log(result);
      res.status(200).json({
        message: "Subject Added To Database",
        Subject_Details: subjectDetails,
      });
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({
        error: err,
      });
    });
})

// Update SUbject Data
router.patch("/updateSubject/:subjectID", (req, res, next) => {
  const id = req.params.subjectID;
  const updateOps = {};

  for (const ops of req.body) {
    updateOps[ops.propName] = ops.value;
  }

  SubjectDetails.updateOne({ _id: id }, { $set: updateOps })
    .exec()
    .then((result) => {
      res.status(200).json({
        message: `Data updated successfully for the Subject with ID ${id}`,
        result: result,
      });
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({
        error: err,
      });
    });
})

module.exports = router;