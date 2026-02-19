"use strict";

// src/routes/authRoute.js
var express = require('express');
var router = express.Router();
var _require = require('../controllers/authController'),
  register = _require.register,
  login = _require.login;
router.post('/register', register);
router.post('/login', login);
module.exports = router;