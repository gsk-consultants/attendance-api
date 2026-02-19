// src/controllers/authController.js
const User = require('../module/user');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

 
exports.register = async (req, res) => {
  try {
    const {
      name,
      designation,
      mobile,
      username,
      password,
      email,
      role
    } = req.body;

    const existingUser = await User.findOne({
      $or: [{ username }, { email }]
    });

    if (existingUser) {
      return res.status(400).json({
        success: false,
        message: "User already exists",
      });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = new User({
      name,
      designation,
      mobile,
      username,
      email,
      password: hashedPassword,
      role
    });

    await newUser.save();

    res.status(201).json({
      success: true,
      message: "Admin registered successfully",
    });

  } catch (error) {
    console.error("Registration error:", error.message);
    res.status(500).json({
      success: false,
      message: "Registration failed",
    });
  }
};



 
exports.login = async (req, res) => {
    try {
      const { username, password } = req.body;
  
      const user = await User.findOne({ username });
      if (!user) {
        return res.status(400).json({ success: false, message: 'Invalid credentials' });
      }
  
      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) {
        return res.status(400).json({ success: false, message: 'Invalid credentials' });
      }
  
      const token = jwt.sign({ id: user._id, role: user.role }, process.env.JWT_SECRET, { expiresIn: '1h' });
      res.status(200).json({ success: true, token, role: user.role });
    } catch (error) {
      console.error('Login error:', error.message);
      res.status(500).json({ success: false, message: 'Login failed' });
    }
  };

exports.getDashboardData = (req, res) => {
  res.status(501).json({ message: 'Not Implemented' });
};