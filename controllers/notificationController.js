const Notification = require("../models/Notification");

exports.ajouterNotification = async (req, res) => {
  try {
    const nouvelObj = new Notification(req.body);
    await nouvelObj.save();
    res.status(201).json(nouvelObj);
  } catch (err) {
    res.status(400).json({ message: "Erreur d'ajout", error: err.message });
  }
};

exports.listerNotifications = async (req, res) => {
  try {
    const items = await Notification.find().populate("user");
    res.json(items);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.getNotificationById = async (req, res) => {
  try {
    const item = await Notification.findById(req.params.id).populate("user");
    if (!item) return res.status(404).json({ message: "Notification non trouvée" });
    res.json(item);
  } catch (err) {
    res.status(500).json({ message: "Erreur lors de la récupération", error: err.message });
  }
};

exports.updateNotification = async (req, res) => {
  try {
    const updatedObj = await Notification.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
    if (!updatedObj) return res.status(404).json({ message: "Notification non trouvée" });
    res.json(updatedObj);
  } catch (err) {
    res.status(400).json({ message: "Erreur de mise à jour", error: err.message });
  }
};

exports.deleteNotification = async (req, res) => {
  try {
    const deletedObj = await Notification.findByIdAndDelete(req.params.id);
    if (!deletedObj) return res.status(404).json({ message: "Notification non trouvée" });
    res.json({ message: "Notification supprimée avec succès" });
  } catch (err) {
    res.status(500).json({ message: "Erreur de suppression", error: err.message });
  }
};