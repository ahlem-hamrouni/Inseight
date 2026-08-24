const mongoose = require("mongoose");
const User = require("./User");

const StudentSchema = new mongoose.Schema({
  studentCode: {
    type: String,
    required: true,
    maxlength: 10,
    minlength: 5,
    unique: true,
  },
  level: {
    type: String,
    enum: ["L1", "L2", "L3", "M1", "M2"],
  },
  group: String,
  birthDate: Date,
  departement: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Departement",
  },
});
module.exports = User.discriminator("student", StudentSchema);