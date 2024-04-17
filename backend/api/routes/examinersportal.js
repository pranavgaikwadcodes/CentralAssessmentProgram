const express = require("express");
const router = express.Router();
const mongoose = require('mongoose');
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const uuid = require("uuid"); // for auto generation

const checkAuth = require("../middleware/check-auth");

const ProfileDetails = require("../models/examinersportal/profile");
const BillingDetails = require("../models/collegeportal/billing");
const CardDetails = require("../models/examinersportal/card");
const BundleDetails = require("../models/collegeportal/bundle");

// Register
router.post("/registerExaminer", (req, res, next) => {
  const {
    email,
    password,
    name,
    phone,
    college_name,
    college_code,
    experience,
    branch,
    PAN_card_number,
    bank_IFSC_code,
    bank_account_number,
    UPI_id
  } = req.body;

  // Hash the password
  bcrypt.hash(password, 10, (err, hashedPassword) => {
    if (err) {
      return res.status(500).json({
        error: err
      });
    }

    // Extract the email prefix
    const emailPrefix = email.split("@")[0];

    // Generate a random number
    const randomNumber = Math.floor(Math.random() * 10000);

    // Concatenate email prefix and random number to generate userID
    const userID = `${emailPrefix}${randomNumber}`;

    const newExaminer = new ProfileDetails({
      _id: new mongoose.Types.ObjectId(), // Generate a new ObjectId for the _id field
      userID: userID,
      email: email,
      password: hashedPassword, // Save hashed password
      name: name,
      phone: phone,
      college_name: college_name,
      college_code: college_code,
      experience: experience,
      branch: branch,
      PAN_card_number: PAN_card_number,
      bank_IFSC_code: bank_IFSC_code,
      bank_account_number: bank_account_number,
      UPI_id: UPI_id
    });

    newExaminer.save()
      .then(result => {
        console.log(result);
        res.status(201).json({
          message: "Examiner registered successfully",
          // examiner: result
          examiner: {
            _id: result._id,
            name: result.name,
            email: result.email
          }
        });
      })
      .catch(err => {
        console.log(err);
        res.status(500).json({
          error: err
        });
      });
  });
});

// Login
router.post("/loginExaminer", (req, res, next) => {
  ProfileDetails.findOne({ email: req.body.email })
    .exec()
    .then((examiner) => {
      if (!examiner) {
        return res.status(401).json({
          message: "Auth, Failed",
        });
      }
      bcrypt.compare(req.body.password, examiner.password, (err, result) => {
        if (err) {
          return res.status(401).json({
            message: "Auth # Failed",
          });
        }
        if (result) {
          const  token = jwt.sign(
            {
              email: examiner.email,
              userID: examiner._id,
            },
            process.env.JWT_SECRET,
            {
              expiresIn: "1h",
            },
          );
          res.setHeader('Authorization', `Bearer ${token}`);
          return res.status(200).json({
            message: "Auth Successsss",
            token: token,
            examinerID: examiner._id, // Include examiner ID
            name: examiner.name, // Include examiner name
            email: examiner.email // Include examiner email
          });
        }
        res.status(401).json({
          message: "Auth Failed dn",
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

// Fetch Examiner by ID
router.get("/examiner/:examinerID", (req, res, next) => {
  const examinerID = req.params.examinerID;

  ProfileDetails.findById(examinerID)
    .exec()
    .then((examiner) => {
      if (!examiner) {
        return res.status(404).json({
          message: "Examiner not found",
        });
      }
      res.status(200).json({
        message: "Examiner found",
        examiner: examiner,
      });
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({
        error: err,
      });
    });
});

// Profile Update
router.patch("/updateProfile/:profileID", (req, res, next) => {
  const id = req.params.profileID;
  const updateOps = {};

  for (const ops of req.body) {
    updateOps[ops.propName] = ops.value;
  }

  ProfileDetails.updateOne({ _id: id }, { $set: updateOps })
    .exec()
    .then((result) => {
      res.status(200).json({
        message: `Data updated successfully for the Profile with ID ${id}`,
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

// add card
router.post("/addCard", (req, res, next) => {
  // Generate a unique card number
  const card_number = uuid.v4(); // Generating a random UUID

  const cardDetails = new CardDetails({
    _id: new mongoose.Types.ObjectId(),
    userID: req.body.userID,
    email: req.body.email,
    name: req.body.name,
    role: req.body.role,

    card_number: card_number, // Assigning the generated card number

    subject_code: req.body.subject_code,
    bundle_number: req.body.bundle_number,
    number_of_papers_in_bundle: req.body.number_of_papers_in_bundle,
    branch: req.body.branch,
    card_issue_date_time: req.body.card_issue_date_time,
    bundle_issue_date_time: req.body.bundle_issue_date_time,
    bundle_status: req.body.bundle_status,
  });

  cardDetails
    .save()
    .then((result) => {
      console.log(result);
      res.status(200).json({
        message: "Card Added To Database",
        Card_Details: cardDetails,
      });
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({
        error: err,
      });
    });
});

// Fetch Assigned Bundles
router.get("/assigned/:cardNumber", (req, res, next) => {
  const id = req.params.cardNumber;
  BundleDetails.find({ assigned_to: id })
    .exec()
    .then((bundles) => {
      if (bundles.length === 0) {
        return res.status(404).json({
          message: "No bundles assigned to this card number",
        });
      }
      res.status(200).json({
        message: "Bundles assigned to this card number found",
        bundles: bundles,
      });
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({
        error: err,
      });
    });
});

// Fetch Payments for a User
router.get("/payments/:userID", (req, res, next) => {
  const userID = req.params.userID;

  BillingDetails.find({ userID: userID })
    .exec()
    .then((payments) => {
      if (payments.length === 0) {
        return res.status(404).json({
          message: "No payments found for this user",
        });
      }
      res.status(200).json({
        message: "Payments found for this user",
        payments: payments,
      });
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({
        error: err,
      });
    });
});

module.exports = router;
