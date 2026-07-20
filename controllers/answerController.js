const Answer = require("../models/Answer");

exports.ajouterAnswer = async (req, res) => {
  try {
    const nouvelObj = new Answer(req.body);
    await nouvelObj.save();
    res.status(201).json(nouvelObj);
  } catch (err) {
    res.status(400).json({ message: "Erreur d'ajout", error: err.message });
  }
};


exports.listerAnswers = async (req, res) => {
  try {
    const items = await Answer.find().populate("attempt").populate("question").populate("selectedChoice");
    res.json(items);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.getAnswerById = async (req, res) => {
  try {
    const item = await Answer.findById(req.params.id).populate("attempt").populate("question").populate("selectedChoice");
    if (!item) return res.status(404).json({ message: "Réponse non trouvée" });
    res.json(item);
  } catch (err) {
    res.status(500).json({ message: "Erreur lors de la récupération", error: err.message });
  }
};

exports.updateAnswer = async (req, res) => {
  try {
    const updatedObj = await Answer.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
    if (!updatedObj) return res.status(404).json({ message: "Réponse non trouvée" });
    res.json(updatedObj);
  } catch (err) {
    res.status(400).json({ message: "Erreur de mise à jour", error: err.message });
  }
};

exports.deleteAnswer = async (req, res) => {
  try {
    const deletedObj = await Answer.findByIdAndDelete(req.params.id);
    if (!deletedObj) return res.status(404).json({ message: "Réponse non trouvée" });
    res.json({ message: "Réponse supprimée avec succès" });
  } catch (err) {
    res.status(500).json({ message: "Erreur de suppression", error: err.message });
  }
};