const express = require('express');
const router = express.Router();
const authMiddleware = require('../middileware/authMiddleware');
const {
  checkIn,
  checkOut,
  getTodayAttendance,
  getAllAttendance,
  getMyAttendance
} = require('../controllers/attendanceController');
const upload = require('../middileware/upload');

/* =========================
   USER ROUTES
========================= */

// ✅ Check In (with photo upload)
router.post(
  "/checkin",
  authMiddleware(["user"]),
  upload.single("photo"),
  checkIn
);

router.post(
  "/checkout",
  authMiddleware(["user"]),
  upload.single("photo"),
  checkOut
);


// ✅ Get Today's Attendance
router.get(
  "/today",
  authMiddleware(["user"]),
  getTodayAttendance
);

router.get(
  "/mine",
  authMiddleware(["user"]),
  getMyAttendance
);
/* =========================
   ADMIN ROUTES
========================= */

// ✅ Get All Attendance (Admin Only)
router.get(
  "/all",
  authMiddleware(["admin"]),
  getAllAttendance
);

module.exports = router;
