const mongoose = require("mongoose");

const quizSchema = new mongoose.Schema({
  course: { type: mongoose.Schema.Types.ObjectId, ref: 'Course' },
  title:  String, 
  description: String,
  duration: Number, // En minutes
  passingScore: Number,
  isPublished:  Boolean ,
  createdBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User'}
}, { timestamps: true });

module.exports = mongoose.model("Quiz", quizSchema);