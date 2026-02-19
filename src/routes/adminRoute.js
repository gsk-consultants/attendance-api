const express = require('express');
const router = express.Router();
const authMiddleware = require('../middileware/authMiddleware');

const { 
  createEmployee,
  getAllEmployees
} = require('../controllers/adminController');

// 🔹 Create employee (admin only)
router.post(
  '/create-employee',
  authMiddleware(['admin']),
  createEmployee
);

// 🔹 Get all employees (admin only)
router.get(
  '/employees',
  authMiddleware(['admin']),
  getAllEmployees
);

module.exports = router;
