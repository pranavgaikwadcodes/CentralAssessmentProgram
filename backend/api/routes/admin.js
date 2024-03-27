const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
require('dotenv').config()

const checkAuth = require("../middleware/check-auth");

// importing modals
const CollegeDetails = require("../models/collegeportal/collegedetails");
const AdminDetails = require("../models/admin/admin");


// Login
router.post("/loginAdmin", (req, res, next) => {
  AdminDetails.findOne({ username: req.body.username })
    .exec()
    .then((admin) => {
      if (!admin) {
        return res.status(401).json({
          message: "Auth Failed",
        });
      }
      bcrypt.compare(req.body.password, admin.password, (err, result) => {
        if (err) {
          return res.status(401).json({
            message: "Auth Failed",
          });
        }
        if (result) {
          const  token = jwt.sign(
            {
              username: admin.username,
              userID: admin._id,
            },
            process.env.JWT_SECRET,
            {
              expiresIn: "1h",
            },
          );
          res.setHeader('Authorization', `Bearer ${token}`);
          return res.status(200).json({
            message: "Auth Success",
            token: token,
            adminID: admin._id
          });
        }
        res.status(401).json({
          message: "Auth Failed",
          result: result,
        });
      });
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({
        error: err,
      });
    });
});

// Admin Related Routes
router.get("/", (req, res, next) => {
  AdminDetails.find()
    .exec()
    .then((results) => {
      if (!results || results == "" || results.length < 1) {
        return res.status(401).json({
          error: "No data found",
          results: results,
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
router.patch("/updateAdminAuth/:id", (req, res, next) => {
  const id = req.params.id;
  const updateOps = {};

  // Assuming req.body is an object containing key-value pairs to be updated
  for (const key in req.body) {
    // Check if the field being updated is the password
    if (key === "password") {
      // Hash the new password before updating
      const hashedPassword = bcrypt.hashSync(req.body[key], 10); // Hash the password with a salt round of 10
      updateOps[key] = hashedPassword;
    } else {
      updateOps[key] = req.body[key];
    }
  }

  AdminDetails.updateOne({ _id: id }, { $set: updateOps })
    .exec()
    .then((result) => {
      console.log(result);
      res.status(200).json({
        message: "Updated",
        result: result,
      });
    })
    .catch((err) => {
      console.log(err);
      res.status(400).json({
        error: err,
      });
    });
});


// ============================================== //

// College Related Routes
router.post("/addCollege/", (req, res, next) => {
  bcrypt.hash(req.body.password, 10, (err, hashedPassword) => {
    if (err) {
      return res.status(500).json({
        error: err,
      });
    }

    const collegeDetails = new CollegeDetails({
      _id: new mongoose.Types.ObjectId(),
      name: req.body.name,
      center_code: req.body.center_code,
      college_type: req.body.college_type,
      college_departments_count: req.body.college_departments_count,
      address: req.body.address,
      contact: req.body.contact,
      email: req.body.email,
      password: hashedPassword,
    });

    collegeDetails
      .save()
      .then((result) => {
        console.log(result);
        res.status(200).json({
          message: "College Added To Database",
          college_added: collegeDetails,
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

router.get("/colleges/", (req, res, next) => {
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

router.get("/colleges/:collegeID", (req, res, next) => {
  const id = req.params.collegeID;
  CollegeDetails.findById(id)
    .exec()
    .then((result) => {
      if (!result) {
        return res.status(404).json({
          error: "Invalid ID or No data for this ID",
        });
      } else {
        res.status(200).json(result);
      }
    })
    .catch((error) => {
      console.log("ERROR IN RETRIEVING DATA FROM DATABASE");
      next(error);
      res.status(500).json({
        error: error,
        message: "ERROR IN RETRIEVING DATA FROM DATABASE",
      });
    });
});

router.patch("/updateCollege/:collegeID", (req, res, next) => {
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

router.delete("/deleteCollege/:collegeID", (req, res, next) => {
  const id = req.params.collegeID;
  CollegeDetails.deleteOne({ _id: id })
    .exec()
    .then((result) => {
      res.status(200).json({
        message: "College Removed From Database",
      });
    })
    .catch((error) => {
      console.log("ERROR DELETING DATA FROM DATABASE");
      next(error);
      res.status(500).json({
        error: error,
        message: "ERROR DELETING DATA FROM DATABASE",
      });
    });
});

module.exports = router;
