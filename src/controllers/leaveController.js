const Leave = require("../module/leaveModel");


// 📌 User Request Leave
exports.requestLeave = async (req, res) => {
  try {
    const { fromDate, toDate, reason } = req.body;

    const userId = req.user.id;

    const start = new Date(fromDate);
    const end = new Date(toDate);

    const diffTime = Math.abs(end - start);
    const totalDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24)) + 1;

    const leave = await Leave.create({
      user: userId,
      fromDate,
      toDate,
      totalDays,
      reason,
    });

    res.json({
      success: true,
      message: "Leave request submitted",
      data: leave,
    });
  } catch (error) {
    res.status(500).json({ success: false });
  }
};



// 📌 User - Get My Leaves
exports.getMyLeaves = async (req, res) => {
  try {
    const leaves = await Leave.find({ user: req.user.id })
      .sort({ createdAt: -1 });

    res.json({ success: true, data: leaves });
  } catch (err) {
    res.status(500).json({ success: false });
  }
};



// 📌 Admin - Get All Leave Requests
exports.getAllLeaves = async (req, res) => {
  try {
    const leaves = await Leave.find()
      .populate("user", "name designation email")
      .sort({ createdAt: -1 });

    res.json({ success: true, data: leaves });
  } catch (err) {
    res.status(500).json({ success: false });
  }
};



// 📌 Admin - Approve / Reject Leave
exports.updateLeaveStatus = async (req, res) => {
  try {
    const { status, adminRemark } = req.body;

    const leave = await Leave.findById(req.params.id);

    if (!leave) {
      return res.status(404).json({ success: false });
    }

    leave.status = status;
    leave.adminRemark = adminRemark || "";

    await leave.save();

    res.json({
      success: true,
      message: `Leave ${status}`,
    });
  } catch (err) {
    res.status(500).json({ success: false });
  }
};