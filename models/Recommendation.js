const mongoose = require ("mongoose");
const recommendationSchema = new mongoose.Schema({
     student: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    messsage : String , 
    type : String , 
    confidenceScore : Number ,},
    { timestamps: true });
    module.exports= mongoose.model("Recommendation",recommendationSchema);


