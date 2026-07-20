const AuditLog = require("../models/AuditLog");

exports.ajouterAuditLog = async (req, res) => {
  try {
    const nouvelObj = new AuditLog(req.body);
    await nouvelObj.save();
    res.status(201).json(nouvelObj);
  } catch (err) {
    res.status(400).json({ message: "Erreur d'ajout", error: err.message });
  }
};

exports.listerAuditLogs = async (req, res) => {
  try {
    const items = await AuditLog.find().populate("user");
    res.json(items);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.getAuditLogById = async (req, res) => {
  try {
    const item = await AuditLog.findById(req.params.id).populate("user");
    if (!item) return res.status(404).json({ message: "Log d'audit non trouvé" });
    res.json(item);
  } catch (err) {
    res.status(500).json({ message: "Erreur lors de la récupération", error: err.message });
  }
};

exports.updateAuditLog = async (req, res) => {
  try {
    const updatedObj = await AuditLog.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
    if (!updatedObj) return res.status(404).json({ message: "Log d'audit non trouvé" });
    res.json(updatedObj);
  } catch (err) {
    res.status(400).json({ message: "Erreur de mise à jour", error: err.message });
  }
};

exports.deleteAuditLog = async (req, res) => {
  try {
    const deletedObj = await AuditLog.findByIdAndDelete(req.params.id);
    if (!deletedObj) return res.status(404).json({ message: "Log d'audit non trouvé" });
    res.json({ message: "Log d'audit supprimé avec succès" });
  } catch (err) {
    res.status(500).json({ message: "Erreur de suppression", error: err.message });
  }
};