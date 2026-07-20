const Module = require("../models/Module");

exports.ajouterModule = async (req, res) => {
  try {
    const nouvelObj = new Module(req.body);
    await nouvelObj.save();
    res.status(201).json(nouvelObj);
  } catch (err) {
    res.status(400).json({ message: "Erreur d'ajout", error: err.message });
  }
};

exports.listerModules = async (req, res) => {
  try {
    const items = await Module.find().populate("course");
    res.json(items);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.getModuleById = async (req, res) => {
  try {
    const item = await Module.findById(req.params.id).populate("course");
    if (!item) return res.status(404).json({ message: "Module non trouvé" });
    res.json(item);
  } catch (err) {
    res.status(500).json({ message: "Erreur lors de la récupération", error: err.message });
  }
};

exports.updateModule = async (req, res) => {
  try {
    const updatedObj = await Module.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
    if (!updatedObj) return res.status(404).json({ message: "Module non trouvé" });
    res.json(updatedObj);
  } catch (err) {
    res.status(400).json({ message: "Erreur de mise à jour", error: err.message });
  }
};

exports.deleteModule = async (req, res) => {
  try {
    const deletedObj = await Module.findByIdAndDelete(req.params.id);
    if (!deletedObj) return res.status(404).json({ message: "Module non trouvé" });
    res.json({ message: "Module supprimé avec succès" });
  } catch (err) {
    res.status(500).json({ message: "Erreur de suppression", error: err.message });
  }
};