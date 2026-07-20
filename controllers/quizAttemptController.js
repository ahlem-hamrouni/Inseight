const QuizAttempt = require("../models/QuizAttempt");
const Answer = require("../models/Answer");
exports.ajouterAttempt = async (req, res) => {
  try {
    const nouvelObj = new QuizAttempt(req.body);
    await nouvelObj.save();
    res.status(201).json(nouvelObj);
  } catch (err) {
    res.status(400).json({ message: "Erreur d'ajout", error: err.message });
  }
};

exports.listerAttempts = async (req, res) => {
  try {
    const items = await QuizAttempt.find().populate("student").populate("quiz");
    res.json(items);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.getAttemptById = async (req, res) => {
  try {
    const item = await QuizAttempt.findById(req.params.id).populate("student").populate("quiz");
    if (!item) return res.status(404).json({ message: "Tentative non trouvée" });
    res.json(item);
  } catch (err) {
    res.status(500).json({ message: "Erreur lors de la récupération", error: err.message });
  }
};

exports.updateAttempt = async (req, res) => {
  try {
    const updatedObj = await QuizAttempt.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
    if (!updatedObj) return res.status(404).json({ message: "Tentative non trouvée" });
    res.json(updatedObj);
  } catch (err) {
    res.status(400).json({ message: "Erreur de mise à jour", error: err.message });
  }
};

exports.deleteAttempt = async (req, res) => {
  try {
    await Answer.deleteMany({ attempt: req.params.id });
    const deletedObj = await QuizAttempt.findByIdAndDelete(req.params.id);
    if (!deletedObj) return res.status(404).json({ message: "Tentative non trouvée" });
    res.json({ message: "Tentative supprimée avec succès" });
  } catch (err) {
    res.status(500).json({ message: "Erreur de suppression", error: err.message });
  }
};
