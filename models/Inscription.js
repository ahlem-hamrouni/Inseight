const mongoose = require ("mongoose");
const inscriptionSchema = new mongoose.Schema ({
     student: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
     course: { type: mongoose.Schema.Types.ObjectId, ref: 'Course', required: true },
     enrolledAt: { type: Date, default: Date.now },
     status: { type: String, enum: ['active', 'completed', 'dropped'], },
},{ timestamps: true },
);
inscriptionSchema.index({ student: 1, course: 1 }, { unique: true }); 
module.exports=mongoose.model("Inscription", inscriptionSchema)