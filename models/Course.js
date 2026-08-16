const mongoose = require("mongoose");
const courseSchema = new mongoose.Schema({
    title :String, 
    description : String , 
    departement : { type : mongoose.Schema.Types.ObjectId, ref : "Departement" , required : true },
    teacher: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    duration : String ,
    level : String , 
    image : String },
  { timestamps: true },) 
  module.exports= mongoose.model("Course",courseSchema);


