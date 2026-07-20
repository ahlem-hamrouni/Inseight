const mongoose = require("mongoose");

const choiceSchema = new mongoose.Schema({
  question: { type: mongoose.Schema.Types.ObjectId, ref: 'Question' },
  text:   String ,
  isCorrect:  Boolean,
  order: Number
});

module.exports = mongoose.model("Choice", choiceSchema);