const express = require('express');
const router = express.Router();
const authMiddleware = require('../middileware/authMiddleware');
const { checkIn, checkOut, getTodayAttendance, getAllAttendance } = require('../controllers/attendanceController');
const upload = require('../middileware/upload');

router.post(
  "/checkin",
  authMiddleware(["user"]),
  upload.single("photo"),
  checkIn
);
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
