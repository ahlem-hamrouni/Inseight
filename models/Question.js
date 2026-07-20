const mongoose = require("mongoose");

const questionSchema = new mongoose.Schema({
  quiz: { type: mongoose.Schema.Types.ObjectId, ref: 'Quiz' },
  statement: { type: String, required: true },
  type: { type: String, enum: ['MCQ', 'TrueFalse', 'ShortAnswer'] },
  points: Number,
  order: Number
}, { timestamps: true });

module.exports = mongoose.model("Question", questionSchema);