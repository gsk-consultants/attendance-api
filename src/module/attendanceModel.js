const mongoose = require("mongoose");

const attendanceSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
      index: true,
    },

    date: {
      type: String, // YYYY-MM-DD
      required: true,
      index: true,
    },

    checkIn: {
      time: {
        type: Date, // ✅ FIXED (was String)
      },
      location: {
        latitude: Number,
        longitude: Number,
      },
      photo: {
        type: String,
      },
      status: {
        type: String,
        enum: ["OnTime", "Late"], // ✅ validation
      },
    },

    checkOut: {
      time: {
        type: Date, // ✅ FIXED
      },
      location: {
        latitude: Number,
        longitude: Number,
      },
      photo: {
        type: String,
      },
      status: {
        type: String,
        enum: ["OnTime", "Early"], // ✅ validation
      },
    },

    workingHours: {
      type: String, // "8h 30m"
    },
  },
  { timestamps: true }
);

// 🔥 VERY IMPORTANT (prevents duplicate check-in)
attendanceSchema.index({ user: 1, date: 1 }, { unique: true });

module.exports = mongoose.model("Attendance", attendanceSchema);  