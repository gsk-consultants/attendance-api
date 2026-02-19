const User = require("../module/user");
const bcrypt = require("bcryptjs");
const nodemailer = require("nodemailer");

exports.createEmployee = async (req, res) => {
  try {
    const {
      name,
      designation,
      mobile,
      username,
      password,
      email,
    } = req.body;

    // Check existing user
    const existing = await User.findOne({
      $or: [{ username }, { email }],
    });

    if (existing) {
      return res.status(400).json({
        success: false,
        message: "Employee already exists",
      });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const employee = new User({
      name,
      designation,
      mobile,
      username,
      email,
      password: hashedPassword,
      role: "user",
    });

    await employee.save();

    // 📧 Send Email
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL,
        pass: process.env.EMAIL_PASS,
      },
    });

    await transporter.sendMail({
      from: process.env.EMAIL,
      to: email,
      subject: "Your Attendance App Login",
      text: `
Hello ${name},

Your account has been created.

Name: ${name}
Designation: ${designation}

Username: ${username}
Password: ${password}

Please login in the Attendance App.

Regards,
Admin
      `,
    });

    res.status(201).json({
      success: true,
      message: "Employee created successfully & email sent",
    });
  } catch (err) {
    console.error("Create Employee Error:", err);
    res.status(500).json({
      success: false,
      message: "Failed to create employee",
    });
  }
};
exports.getAllEmployees = async (req, res) => {
  try {
    const employees = await User.find({ role: "user" })
      .select("-password"); // hide password

    res.status(200).json({
      success: true,
      data: employees,
    });

  } catch (error) {
    console.error("Fetch employee error:", error);
    res.status(500).json({
      success: false,
      message: "Failed to fetch employees",
    });
  }
};
