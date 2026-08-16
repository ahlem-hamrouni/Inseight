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
  departement: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Departement",
  },
});

module.exports = User.discriminator("teacher", TeacherSchema);