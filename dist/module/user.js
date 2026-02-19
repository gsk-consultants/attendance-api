"use strict";

// src/models/userModel.js
var mongoose = require('mongoose');
var userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  },
  role: {
    type: String,
    "enum": ['admin', 'user'],
    "default": 'user'
  } // Define roles
});
module.exports = mongoose.model('User ', userSchema);