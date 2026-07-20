const mongoose = require("mongoose");
const User = require("./User");

const TeacherSchema = new mongoose.Schema({
  speciality: {
    type: String,
    required: true,
  },

  office: String,

  hireDate: {
    type: Date,
    default: Date.now,
  },
});

module.exports = User.discriminator("teacher", TeacherSchema);
