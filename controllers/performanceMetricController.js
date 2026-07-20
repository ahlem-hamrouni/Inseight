const PerformanceMetric = require("../models/PerformanceMetric");

exports.ajouterMetric = async (req, res) => {
  try {
    const nouvelObj = new PerformanceMetric(req.body);
    await nouvelObj.save();
    res.status(201).json(nouvelObj);
  } catch (err) {
    res.status(400).json({ message: "Erreur d'ajout", error: err.message });
  }
};

exports.listerMetrics = async (req, res) => {
  try {
    const items = await PerformanceMetric.find().populate("student").populate("course");
    res.json(items);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.getMetricById = async (req, res) => {
  try {
    const item = await PerformanceMetric.findById(req.params.id).populate("student").populate("course");
    if (!item) return res.status(404).json({ message: "Métrique de performance non trouvée" });
    res.json(item);
  } catch (err) {
    res.status(500).json({ message: "Erreur lors de la récupération", error: err.message });
  }
};

exports.updateMetric = async (req, res) => {
  try {
    const updatedObj = await PerformanceMetric.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
    if (!updatedObj) return res.status(404).json({ message: "Métrique de performance non trouvée" });
    res.json(updatedObj);
  } catch (err) {
    res.status(400).json({ message: "Erreur de mise à jour", error: err.message });
  }
};

exports.deleteMetric = async (req, res) => {
  try {
    const deletedObj = await PerformanceMetric.findByIdAndDelete(req.params.id);
    if (!deletedObj) return res.status(404).json({ message: "Métrique de performance non trouvée" });
    res.json({ message: "Métrique de performance supprimée avec succès" });
  } catch (err) {
    res.status(500).json({ message: "Erreur de suppression", error: err.message });
  }
};