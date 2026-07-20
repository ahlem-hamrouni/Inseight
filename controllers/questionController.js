const Question = require("../models/Question");
const Choice = require("../models/Choice");

exports.ajouterQuestion = async (req, res) => {
  try {
    const nouvelObj = new Question(req.body);
    await nouvelObj.save();
    res.status(201).json(nouvelObj);
  } catch (err) {
    res.status(400).json({ message: "Erreur d'ajout", error: err.message });
  }
};

exports.listerQuestions = async (req, res) => {
  try {
    const items = await Question.find().populate("quiz");
    res.json(items);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
exports.listerQuestionsParQuiz = async (req, res) => {
  try {
    const items = await Question.find({ quiz: req.params.quizId }).populate("quiz");
    res.json(items);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.getQuestionById = async (req, res) => {
  try {
    const item = await Question.findById(req.params.id).populate("quiz");
    if (!item) return res.status(404).json({ message: "Question non trouvée" });
    res.json(item);
  } catch (err) {
    res.status(500).json({ message: "Erreur lors de la récupération", error: err.message });
  }
};

exports.updateQuestion = async (req, res) => {
  try {
    const updatedObj = await Question.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
    if (!updatedObj) return res.status(404).json({ message: "Question non trouvée" });
    res.json(updatedObj);
  } catch (err) {
    res.status(400).json({ message: "Erreur de mise à jour", error: err.message });
  }
};

exports.deleteQuestion = async (req, res) => {
  try {
    await Choice.deleteMany({ question: req.params.id });
    const deletedObj = await Question.findByIdAndDelete(req.params.id);
    if (!deletedObj) return res.status(404).json({ message: "Question non trouvée" });
    res.json({ message: "Question supprimée avec succès" });
  } catch (err) {
    res.status(500).json({ message: "Erreur de suppression", error: err.message });
  }
};