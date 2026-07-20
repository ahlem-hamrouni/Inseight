const mongoose = require ("mongoose");
const inscriptionSchema = new mongoose.Schema ({
     student: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
     course: { type: mongoose.Schema.Types.ObjectId, ref: 'Course', required: true },
    
    enroliedAt: Date , 
     status: { type: String, enum: ['active', 'completed', 'dropped'], },
},{ timestamps: true },
)
module.exports=mongoose.model("Inscription", inscriptionSchema)