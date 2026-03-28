const Attendance = require('../module/attendanceModel');
 
const User = require("../module/user");
const getLocalDate = () =>
  new Date().toLocaleDateString("en-CA", {
    timeZone: "Asia/Kolkata", // ✅ INDIA
  });

// ✅ get local time in minutes (IMPORTANT)
const getLocalMinutes = () => {
  const time = new Date().toLocaleTimeString("en-US", {
    timeZone: "Asia/Kolkata",
    hour12: false,
  });

  const [hour, minute] = time.split(":").map(Number);
  return hour * 60 + minute;
};

exports.checkIn = async (req, res) => {
  try {
    const userId = req.user.id;

    const location = req.body.location
      ? JSON.parse(req.body.location)
      : null;

    const photo = req.file
      ? `/uploads/${req.file.filename}`
      : null;

    if (!location || !photo) {
      return res.status(400).json({
        success: false,
        message: "Photo and location required",
      });
    }

    const now = new Date();
    const today = getLocalDate();

    const totalMinutes = getLocalMinutes();

    const officeStart = 10 * 60 + 30; // 10:30 AM
    const status = totalMinutes <= officeStart ? "OnTime" : "Late";

    let attendance = await Attendance.findOne({
      user: userId,
      date: today,
    });

    if (attendance?.checkIn?.time) {
      return res.status(400).json({
        success: false,
        message: "Already checked in today",
      });
    }

    if (!attendance) {
      attendance = new Attendance({
        user: userId,
        date: today,
      });
    }

    attendance.checkIn = {
      time: now,
      location,
      photo,
      status,
    };

    await attendance.save();

    res.json({
      success: true,
      message: `Check-in successful (${status})`,
      status,
    });

  } catch (error) {
    console.log("CheckIn Error:", error);
    res.status(500).json({ success: false });
  }
};


exports.checkOut = async (req, res) => {
  try {
    const userId = req.user.id;

    const location = req.body.location
      ? JSON.parse(req.body.location)
      : null;

    const photo = req.file
      ? `/uploads/${req.file.filename}`
      : null;

    if (!location || !photo) {
      return res.status(400).json({
        success: false,
        message: "Photo and location required",
      });
    }

    const now = new Date();
    const today = getLocalDate();

    const attendance = await Attendance.findOne({
      user: userId,
      date: today,
    });

    if (!attendance?.checkIn?.time) {
      return res.status(400).json({
        success: false,
        message: "Check-in required first",
      });
    }

    if (attendance?.checkOut?.time) {
      return res.status(400).json({
        success: false,
        message: "Already checked out",
      });
    }

    // ✅ FIXED TIME LOGIC (IMPORTANT)
    const totalMinutes = getLocalMinutes();
    const officeEnd = 18 * 60; // 6:00 PM

    const checkOutStatus =
      totalMinutes >= officeEnd ? "OnTime" : "Early";

    // ✅ working hours
    const diffMs = now - new Date(attendance.checkIn.time);

    const hours = Math.floor(diffMs / (1000 * 60 * 60));
    const minutes = Math.floor(
      (diffMs % (1000 * 60 * 60)) / (1000 * 60)
    );

    const workingHours = `${hours}h ${minutes}m`;

    attendance.checkOut = {
      time: now,
      location,
      photo,
      status: checkOutStatus,
    };

    attendance.workingHours = workingHours;

    await attendance.save();

    res.json({
      success: true,
      message: `Check-out successful (${checkOutStatus})`,
      workingHours,
    });

  } catch (error) {
    console.log("CheckOut Error:", error);
    res.status(500).json({ success: false });
  }
};


exports.getTodayAttendance = async (req, res) => {
  try {
    const today = getLocalDate(); // ✅ FIXED

    const attendance = await Attendance.findOne({
      user: req.user.id,
      date: today,
    }).populate("user", "name designation username email");

    res.json({
      success: true,
      data: attendance || null,
    });

  } catch (err) {
    console.log("Get Attendance Error:", err);
    res.status(500).json({
      success: false,
      message: "Failed to fetch attendance",
    });
  }
};
exports.getMyAttendance = async (req, res) => {
  try {
    const records = await Attendance.find({
      user: req.user.id,
    }).sort({ date: -1 });

    res.json({
      success: true,
      data: records,
    });
  } catch (err) {
    res.status(500).json({ success: false });
  }
};
exports.getAllAttendance = async (req, res) => {
  try {
    const records = await Attendance.find()
      .populate("user", "name designation username email")
      .sort({ createdAt: -1 });

    res.json({
      success: true,
      data: records,
    });

  } catch (err) {
    console.log("Get All Attendance Error:", err);
    res.status(500).json({
      success: false,
      message: "Failed to fetch attendance",
    });
  }
};
