const mongoose = require ("mongoose");
const recommendationSchema = new mongoose.Schema({ 
student: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true }, 
  course: { type: mongoose.Schema.Types.ObjectId, ref: 'Course', required: true }, 
  reason : { type: String , required : true }, 
  score: { type: Number, min: 0, max:100 , required: true }, 
  status: { type: String , enum : ['unread' , 'read'] , default :'unread' } 
}, { timestamps: true });
recommendationSchema.index({ student: 1, course: 1 }, { unique: true });
module.exports = mongoose.model('Recommendation',recommendationSchema); 

