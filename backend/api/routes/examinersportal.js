const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const uuid = require("uuid"); // for auto generation

const checkAuth = require("../middleware/check-auth");

const ProfileDetails = require("../models/examinersportal/profile");
const BillingDetails = require("../models/collegeportal/billing");
const CardDetails = require("../models/examinersportal/card");
const BundleDetails = require("../models/collegeportal/bundle");

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
