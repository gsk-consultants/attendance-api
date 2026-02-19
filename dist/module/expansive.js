"use strict";

var mongoose = require("mongoose");
var expansiveSchema = new mongoose.Schema({
  payeeName: {
    type: String,
    required: true
  },
  payeePhoneNumber: {
    type: String,
    required: true
  },
  particulars: {
    type: String,
    required: true
  },
  amount: {
    type: Number,
    required: true
  },
  amountInWords: {
    type: String,
    required: true
  },
  approved: {
    type: Boolean,
    "default": false
  },
  invoiceNo: {
    type: String,
    unique: true,
    sparse: true
  },
  approvedAmount: {
    type: Number,
    "default": 0
  },
  chequeDetails: {
    type: String,
    "default": ""
  },
  category: {
    type: String
  },
  paymentMode: {
    type: String
  },
  qrTransactionId: {
    type: String,
    "default": ""
  },
  bankTransferId: {
    type: String,
    "default": ""
  },
  cashDenominations: {
    type: String,
    "default": ""
  },
  AccountentName: {
    type: String,
    "default": ""
  },
  billNo: {
    type: String,
    "default": ""
  },
  approvalDate: {
    type: Date
  }
});
module.exports = mongoose.model("expansive", expansiveSchema);