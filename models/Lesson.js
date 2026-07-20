const mongoose = require ("mongoose");
const lessonSchema = new mongoose.Schema ({
    titre: String , 
    content: String, 
    videoUrl: String , 
    pdfUrl: String , 
    order: Number, 
    module:{type: mongoose.Schema.Types.ObjectId , ref: "Lesson"}, },
      { timestamps: true },)
module.exports=mongoose.model("Lesson", lessonSchema)

