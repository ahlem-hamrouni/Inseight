const mongoose = require("mongoose");

const DashboardDataSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true
  },
  totalCourses: { type: Number, default: 0 },
  averageScore: { type: Number, default: 0 },
  attendanceRate: { type: Number, default: 0 },
  progress: { type: Number, default: 0 },
  rank: { type: Number, default: 0 }
}, { timestamps: true });

module.exports = mongoose.model("DashboardData", DashboardDataSchema);