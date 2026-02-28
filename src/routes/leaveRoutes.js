const express = require("express");
const router = express.Router();
const authMiddleware = require("../middileware/authMiddleware");

const {
  requestLeave,
  getMyLeaves,
  getAllLeaves,
  updateLeaveStatus,
} = require("../controllers/leaveController");


// 👤 USER
router.post("/request", authMiddleware(["user"]), requestLeave);
router.get("/my", authMiddleware(["user"]), getMyLeaves);


// 👨‍💼 ADMIN
router.get("/all", authMiddleware(["admin"]), getAllLeaves);
router.put("/update/:id", authMiddleware(["admin"]), updateLeaveStatus);

module.exports = router;