const mongoose = require('mongoose');

const attendanceSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },

  date: {
    type: String,
    required: true,
  },

  checkIn: {
    time: String,
    location: {
      latitude: Number,
      longitude: Number,
    },
    photo: String,
  },

  checkOut: {
    time: String,
    location: {
      latitude: Number,
      longitude: Number,
    },
    photo: String,
  },

}, { timestamps: true });

module.exports = mongoose.model('Attendance', attendanceSchema);
