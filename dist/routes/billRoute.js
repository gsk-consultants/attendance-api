"use strict";

var express = require('express');
var router = express.Router();
var _require = require('../controllers/billCountroller'),
  addPayment = _require.addPayment;
router.post('/add-payment/:invoiceNo', addPayment);
router.get('/bill/:invoiceNo', getPayment);
module.exports = router;