const Attendance = require('../module/attendanceModel');
 
const User = require("../module/user");
const getLocalDate = () =>
  new Date().toLocaleDateString("en-CA", {
    timeZone: "Asia/Karachi", // ← change to yours
  });

exports.checkIn = async (req, res) => {
  try {
    const { time, location, photo } = req.body;
    const userId = req.user.id;

    const now = new Date();
    
    // ✅ Use timezone-aware date string for IST (UTC+5:30)
    const today = new Date().toLocaleDateString("en-CA", {
      timeZone: "Asia/Karachi", // Change to your timezone: "Asia/Kolkata" for India
    }); // gives "YYYY-MM-DD" in your local timezone

    // ✅ Compare hours in LOCAL time, not UTC
    const localHour = parseInt(
      new Date().toLocaleString("en-US", {
        timeZone: "Asia/Karachi", // your timezone
        hour: "numeric",
        hour12: false,
      })
    );
    const localMinute = parseInt(
      new Date().toLocaleString("en-US", {
        timeZone: "Asia/Karachi",
        minute: "numeric",
      })
    );

    // OnTime if before 10:30 local time
    const totalMinutes = localHour * 60 + localMinute;
    const officeStartMinutes = 10 * 60 + 30; // 10:30 = 630 mins

    const status = totalMinutes <= officeStartMinutes ? "OnTime" : "Late";

    let attendance = await Attendance.findOne({ user: userId, date: today });

    if (attendance && attendance.checkIn?.time) {
      return res.status(400).json({ success: false, message: "Already checked in today" });
    }

    if (!attendance) {
      attendance = new Attendance({ user: userId, date: today });
    }

    attendance.checkIn = { time: now, location, photo, status };
    await attendance.save();

    res.json({
      success: true,
      message: `Check-in successful (${status})`,
      status,
    });

  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false });
  }
};


exports.checkOut = async (req, res) => {
  try {
    const { location, photo } = req.body;
    const userId = req.user.id;

    const now = new Date();
  const today = getLocalDate();

    const attendance = await Attendance.findOne({
      user: userId,
      date: today,
    });

    if (!attendance || !attendance.checkIn?.time) {
      return res.status(400).json({
        success: false,
        message: "Check-in required first",
      });
    }

    if (attendance.checkOut?.time) {
      return res.status(400).json({
        success: false,
        message: "Already checked out",
      });
    }

    // 6 PM rule
    const officeEnd = new Date();
    officeEnd.setHours(18, 0, 0, 0);

    const checkOutStatus = now >= officeEnd ? "OnTime" : "Early";

    // Working Hours
    const checkInTime = new Date(attendance.checkIn.time);
    const diffMs = now - checkInTime;

    const hours = Math.floor(diffMs / (1000 * 60 * 60));
    const minutes = Math.floor((diffMs % (1000 * 60 * 60)) / (1000 * 60));

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
    res.status(500).json({ success: false });
  }
};


exports.getTodayAttendance = async (req, res) => {
  try {
    // ✅ Match exactly how checkIn saves: string "YYYY-MM-DD"
    const today = new Date().toISOString().split('T')[0];

    const attendance = await Attendance.findOne({
      user: req.user.id,
      date: today,           // string-to-string match ✅
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
