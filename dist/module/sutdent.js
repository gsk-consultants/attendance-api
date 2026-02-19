"use strict";

var mongoose = require("mongoose");
var studentSchema = new mongoose.Schema({
  studentName: {
    type: String,
    required: true
  },
  gender: {
    type: String,
    "default": 'Not Specified'
  },
  dob: {
    type: Date
  },
  fatherName: {
    type: String,
    required: true
  },
  fatherMobile: {
    type: String,
    required: true
  },
  fatherEmail: {
    type: String,
    index: true
  },
  motherName: {
    type: String
  },
  motherMobile: {
    type: String
  },
  motherEmail: {
    type: String,
    index: true
  },
  area: {
    type: String
  },
  city: {
    type: String
  },
  state: {
    type: String
  },
  age: {
    type: Number
  },
  plotNo: {
    type: String
  },
  street: {
    type: String
  },
  landmark: {
    type: String
  },
  followUps: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'FollowUp'
  }]
}, {
  timestamps: true
});
module.exports = mongoose.model("Student", studentSchema);