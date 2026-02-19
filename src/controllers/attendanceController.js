const Attendance = require('../module/attendanceModel');
 
const User = require("../module/user");
exports.checkIn = async (req, res) => {
  try {
    const { time, location, photo } = req.body;
    const userId = req.user.id;

    const today = new Date().toISOString().split('T')[0];

    const existing = await Attendance.findOne({
      user: userId,
      date: today,
    });

    if (existing && existing.checkIn?.time) {
      return res.status(400).json({
        success: false,
        message: 'Already checked in today',
      });
    }

    const attendance = existing || new Attendance({
      user: userId,
      date: today,
    });

    attendance.checkIn = { time, location, photo };

    await attendance.save();

    res.json({ success: true, message: 'Check-in successful' });

  } catch (error) {
    res.status(500).json({ success: false, message: 'Check-in failed' });
  }
};

exports.checkOut = async (req, res) => {
  try {
    const { time, location, photo } = req.body;
    const userId = req.user.id;

    const today = new Date().toISOString().split('T')[0];

    const attendance = await Attendance.findOne({
      user: userId,
      date: today,
    });

    if (!attendance || !attendance.checkIn) {
      return res.status(400).json({
        success: false,
        message: 'Check-in required first',
      });
    }

    attendance.checkOut = { time, location, photo };

    await attendance.save();

    res.json({ success: true, message: 'Check-out successful' });

  } catch (error) {
    res.status(500).json({ success: false, message: 'Check-out failed' });
  }
};
exports.getTodayAttendance = async (req, res) => {
  try {
    const today = new Date().toISOString().split("T")[0];

    const attendance = await Attendance.findOne({
      user: req.user.id,
      date: today,
    }).populate("user", "name username email");

    res.json({
      success: true,
      data: attendance,
    });
  } catch (err) {
    console.log("Get Attendance Error:", err);
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
