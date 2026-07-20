const Choice = require("../models/Choice");

exports.ajouterChoice = async (req, res) => {
  try {
    const nouvelObj = new Choice(req.body);
    await nouvelObj.save();
    res.status(201).json(nouvelObj);
  } catch (err) {
    res.status(400).json({ message: "Erreur d'ajout", error: err.message });
  }
};

exports.listerChoices = async (req, res) => {
  try {
    const items = await Choice.find().populate("question");
    res.json(items);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
exports.listerChoicesParQuestion = async (req, res) => {
  try {
    const items = await Choice.find({ question: req.params.questionId }).populate("question");
    res.json(items);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.getChoiceById = async (req, res) => {
  try {
    const item = await Choice.findById(req.params.id).populate("question");
    if (!item) return res.status(404).json({ message: "Choix non trouvé" });
    res.json(item);
  } catch (err) {
    res.status(500).json({ message: "Erreur lors de la récupération", error: err.message });
  }
};

exports.updateChoice = async (req, res) => {
  try {
    const updatedObj = await Choice.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
    if (!updatedObj) return res.status(404).json({ message: "Choix non trouvé" });
    res.json(updatedObj);
  } catch (err) {
    res.status(400).json({ message: "Erreur de mise à jour", error: err.message });
  }
};

exports.deleteChoice = async (req, res) => {
  try {
    const deletedObj = await Choice.findByIdAndDelete(req.params.id);
    if (!deletedObj) return res.status(404).json({ message: "Choix non trouvé" });
    res.json({ message: "Choix supprimé avec succès" });
  } catch (err) {
    res.status(500).json({ message: "Erreur de suppression", error: err.message });
  }
};