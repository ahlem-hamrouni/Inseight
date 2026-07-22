const mongoose= require ("mongoose");
const moduleSchema = new mongoose.Schema ({
    titre: { type: String, required: true }, 
    description: String, 
    order :  { type: Number, default: 0 },
    course: { type: mongoose.Schema.Types.ObjectId, ref: 'Course', required: true },},
{ timestamps: true })


  module.exports= mongoose.model("Module", moduleSchema);
