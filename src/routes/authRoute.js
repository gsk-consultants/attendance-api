// src/routes/authRoute.js
const express = require('express');
const router = express.Router();
const { register, login, getDashboardData } = require('../controllers/authController');

router.post('/register', register);
router.post('/login', login);
router.get('/dashboard', getDashboardData);

module.exports = router
 