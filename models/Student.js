const mongoose = require("mongoose");
const User = require("./User");

const StudentSchema = new mongoose.Schema({
  studentCode: {
    type: String,
    required: true,
    maxlenght: 10,
   minlenght:5,
    unique: true,
  },

  level: {
    type: String,
    enum: [
      "L1",
      "L2",
      "L3",
      "M1",
      "M2"
    ],
  },

  birthDate: Date,
});

module.exports = User.discriminator("student", StudentSchema);
