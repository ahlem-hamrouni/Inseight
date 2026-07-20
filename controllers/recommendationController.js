const Recommendation = require("../models/Recommendation");

exports.ajouterRecommendation = async (req, res) => {
  try {
    const nouvelObj = new Recommendation(req.body);
    await nouvelObj.save();
    res.status(201).json(nouvelObj);
  } catch (err) {
    res.status(400).json({ message: "Erreur d'ajout", error: err.message });
  }
};

exports.listerRecommendations = async (req, res) => {
  try {
    const items = await Recommendation.find().populate("student");
    res.json(items);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.getRecommendationById = async (req, res) => {
  try {
    const item = await Recommendation.findById(req.params.id).populate("student");
    if (!item) return res.status(404).json({ message: "Recommandation non trouvée" });
    res.json(item);
  } catch (err) {
    res.status(500).json({ message: "Erreur lors de la récupération", error: err.message });
  }
};

exports.updateRecommendation = async (req, res) => {
  try {
    const updatedObj = await Recommendation.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
    if (!updatedObj) return res.status(404).json({ message: "Recommandation non trouvée" });
    res.json(updatedObj);
  } catch (err) {
    res.status(400).json({ message: "Erreur de mise à jour", error: err.message });
  }
};

exports.deleteRecommendation = async (req, res) => {
  try {
    const deletedObj = await Recommendation.findByIdAndDelete(req.params.id);
    if (!deletedObj) return res.status(404).json({ message: "Recommandation non trouvée" });
    res.json({ message: "Recommandation supprimée avec succès" });
  } catch (err) {
    res.status(500).json({ message: "Erreur de suppression", error: err.message });
  }
};