const mongoose = require ("mongoose");
const departementSchema = new mongoose.Schema({
    name: {type: String , unique : true},
    description : String },
  { timestamps: true },)
  module.exports =mongoose.model("Departement" , departementSchema);

