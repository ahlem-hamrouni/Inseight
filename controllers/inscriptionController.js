const Inscription = require("../models/Inscription");

exports.ajouterInscription = async (req, res) => {
  try {
    const nouvelObj = new Inscription(req.body);
    await nouvelObj.save();
    res.status(201).json(nouvelObj);
  } catch (err) {
    res.status(400).json({ message: "Erreur d'ajout", error: err.message });
  }
};

exports.listerInscriptions = async (req, res) => {
  try {
    const items = await Inscription.find().populate("student").populate("course");
    res.json(items);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.getInscriptionById = async (req, res) => {
  try {
    const item = await Inscription.findById(req.params.id).populate("student").populate("course");
    if (!item) return res.status(404).json({ message: "Inscription non trouvée" });
    res.json(item);
  } catch (err) {
    res.status(500).json({ message: "Erreur lors de la récupération", error: err.message });
  }
};

exports.updateInscription = async (req, res) => {
  try {
    const updatedObj = await Inscription.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
    if (!updatedObj) return res.status(404).json({ message: "Inscription non trouvée" });
    res.json(updatedObj);
  } catch (err) {
    res.status(400).json({ message: "Erreur de mise à jour", error: err.message });
  }
};

exports.deleteInscription = async (req, res) => {
  try {
    const deletedObj = await Inscription.findByIdAndDelete(req.params.id);
    if (!deletedObj) return res.status(404).json({ message: "Inscription non trouvée" });
    res.json({ message: "Inscription supprimée avec succès" });
  } catch (err) {
    res.status(500).json({ message: "Erreur de suppression", error: err.message });
  }
};