const mongoose = require("mongoose");
const quizSchema = new mongoose.Schema({ 
  course: { type: mongoose.Schema.Types.ObjectId, ref: 'Course', required: true }, 
  lesson: {  type: mongoose.Schema.Types.ObjectId, ref: 'Lesson', required: true },
  title: { type: String, required: true }, 
  description: { type: String }, 
  duration: { type: Number },  
  passingScore: { type: Number, default: 50 }, 
  isPublished: { type: Boolean, default: false }, 
  createdBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User' } 
}, { timestamps: true }); 
 
module.exports= mongoose.model('Quiz', quizSchema); 