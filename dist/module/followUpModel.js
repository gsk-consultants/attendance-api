"use strict";

// module/followUpModel.js
var mongoose = require('mongoose');
var followUpSchema = new mongoose.Schema({
  enquiryId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: 'Student'
  },
  // Reference to the Student model
  followUpDate: {
    type: Date,
    required: true
  },
  remarks: {
    type: String,
    required: true
  }
}, {
  timestamps: true
});
var FollowUp = mongoose.model('FollowUp', followUpSchema);
module.exports = FollowUp;