
const User = require('../module/user');

exports.getProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select("-password");

    res.json({
      success: true,
      data: user
    });

  } catch (err) {
    console.log("Profile error:", err);
    res.status(500).json({ success: false });
  }
};
