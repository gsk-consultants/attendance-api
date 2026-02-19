const Attendance = require('../module/attendanceModel');
 
const User = require("../module/user");
exports.checkIn = async (req, res) => {
  try {
    const userId = req.user.id;
    const { latitude, longitude } = req.body;

    if (!req.file) {
      return res.status(400).json({
        success: false,
        message: "Photo is required",
      });
    }

    const photoUrl = req.file.path;

    // 🟢 Get start and end of today
    const start = new Date();
    start.setHours(0, 0, 0, 0);

    const end = new Date();
    end.setHours(23, 59, 59, 999);

    // 🛑 Prevent duplicate check-in
    const existing = await Attendance.findOne({
      user: userId,
      date: { $gte: start, $lte: end },
    });

    if (existing) {
      return res.status(400).json({
        success: false,
        message: "Already checked in today",
      });
    }

    const now = new Date();

    const attendance = await Attendance.create({
      user: userId,
      date: now,
      checkIn: {
        time: now,
        location: { latitude, longitude },
        photo: photoUrl,
      },
    });

    res.status(201).json({
      success: true,
      data: attendance,
    });

  } catch (error) {
    console.log("CheckIn Error:", error);
    res.status(500).json({
      success: false,
      message: "Check-in failed",
    });
  }
};



exports.checkOut = async (req, res) => {
  try {
    const { latitude, longitude } = req.body;
    const userId = req.user.id;

    const startOfDay = new Date();
    startOfDay.setHours(0, 0, 0, 0);

    const endOfDay = new Date();
    endOfDay.setHours(23, 59, 59, 999);

    const attendance = await Attendance.findOne({
      user: userId,
      date: {
        $gte: startOfDay,
        $lte: endOfDay,
      },
    });

    if (!attendance || !attendance.checkIn) {
      return res.status(400).json({
        success: false,
        message: "Check-in required first",
      });
    }

    if (attendance.checkOut) {
      return res.status(400).json({
        success: false,
        message: "Already checked out today",
      });
    }

    const photoUrl = req.file?.path;

    attendance.checkOut = {
      time: new Date(),
      location: { latitude, longitude },
      photo: photoUrl,
    };

    await attendance.save();

    res.json({
      success: true,
      message: "Check-out successful",
      data: attendance,
    });

  } catch (error) {
    console.log("Checkout Error:", error);
    res.status(500).json({
      success: false,
      message: "Check-out failed",
    });
  }
};


exports.getTodayAttendance = async (req, res) => {
  try {
    const start = new Date();
    start.setHours(0, 0, 0, 0);

    const end = new Date();
    end.setHours(23, 59, 59, 999);

    const attendance = await Attendance.findOne({
      user: req.user.id,
      date: { $gte: start, $lte: end },
    }).populate("user", "name designation username email");

    res.json({
      success: true,
      data: attendance,
    });

  } catch (err) {
    console.log("Get Attendance Error:", err);
    res.status(500).json({
      success: false,
      message: "Failed to fetch attendance",
    });
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
