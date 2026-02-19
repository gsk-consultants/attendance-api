const express = require('express');
const router = express.Router();
const authMiddleware = require('../middileware/authMiddleware');
const { checkIn, checkOut, getTodayAttendance, getAllAttendance } = require('../controllers/attendanceController');

router.post('/checkin', authMiddleware(['user']), checkIn);
router.post('/checkout', authMiddleware(['user']), checkOut);
router.get(
  "/today",
  authMiddleware(["user"]),
  getTodayAttendance
);
router.get(
  "/all",
  authMiddleware(["admin"]), // 🔐 admin only
  getAllAttendance
);

module.exports = router;
