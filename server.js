const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const dotenv = require("dotenv");

dotenv.config();

const app = express();

// Middleware
app.use(cors());
app.use(express.json({ limit: "10mb" })); // support base64 images

// MongoDB connection
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("✅ MongoDB connected"))
  .catch((err) =>
    console.error("❌ MongoDB connection error:", err)
  );

// Routes
const authRoute = require("./src/routes/authRoute");
const attendanceRoute = require("./src/routes/attendanceRoute");
const adminRoute = require("./src/routes/adminRoute");

app.use("/api/user", require("./src/routes/userRoute"));

app.use("/api/auth", authRoute); 
app.use("/api/attendance", attendanceRoute);
app.use("/api/admin", adminRoute);

// Default Route
app.get("/", (req, res) => {
  res.send("Attendance API Running 🚀");
});

// Server
const PORT = process.env.PORT || 5000;

app.listen(PORT, () =>
  console.log(`🚀 Server running on port ${PORT}`)
);
