const Quiz = require("../models/Quiz");
const Question = require("../models/Question");
const choice = require("../models/choice");

exports.createQuiz = async (req, res, next) => { 
  try { 
    const quiz = await Quiz.create({ ...req.body, course: req.params.courseId, createdBy: 
req.user.id }); 
    res.status(201).json({ success: true, data: quiz }); 
  } catch (error) { next(error); } 
}; 
 
exports.publishQuiz = async (req, res, next) => { 
  try { 
    const quiz = await Quiz.findByIdAndUpdate(req.params.id, { isPublished: true }, { new: 
true }); 
    res.status(200).json({ success: true, data: quiz }); 
  } catch (error) { next(error); } 
}; 
exports.updateQuiz = async (req, res) => {
  try {
    const updatedObj = await Quiz.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
    if (!updatedObj) return res.status(404).json({ message: "Quiz non trouvé" });
    res.json(updatedObj);
  } catch (err) {
    res.status(400).json({ message: "Erreur de mise à jour", error: err.message });
  }
};

exports.listerQuizzes = async (req, res) => {
  try {
    const items = await Quiz.find().populate("course").populate("createdBy");
    res.json(items);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.getQuizById = async (req, res) => {
  try {
    const item = await Quiz.findById(req.params.id).populate("course").populate("createdBy");
    if (!item) return res.status(404).json({ message: "Quiz non trouvé" });
    res.json(item);
  } catch (err) {
    res.status(500).json({ message: "Erreur lors de la récupération", error: err.message });
  }
};


exports.deleteQuiz = async (req, res) => {
  try {
    const deletedObj = await Quiz.findByIdAndDelete(req.params.id);
    if (!deletedObj) return res.status(404).json({ message: "Quiz non trouvé" });
    res.json({ message: "Quiz supprimé avec succès" });
  } catch (err) {
    res.status(500).json({ message: "Erreur de suppression", error: err.message });
  }
};