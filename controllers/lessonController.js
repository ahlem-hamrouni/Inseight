const Lesson = require("../models/Lesson");

exports.ajouterLesson = async (req, res) => {
  try {
    const nouvelObj = new Lesson(req.body);
    await nouvelObj.save();
    res.status(201).json(nouvelObj);
  } catch (err) {
    res.status(400).json({ message: "Erreur d'ajout", error: err.message });
  }
};

exports.listerLessons = async (req, res) => {
  try {
    const items = await Lesson.find().populate("module");
    res.json(items);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.getLessonById = async (req, res) => {
  try {
    const item = await Lesson.findById(req.params.id).populate("module");
    if (!item) return res.status(404).json({ message: "Leçon non trouvée" });
    res.json(item);
  } catch (err) {
    res.status(500).json({ message: "Erreur lors de la récupération", error: err.message });
  }
};

exports.updateLesson = async (req, res) => {
  try {
    const updatedObj = await Lesson.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
    if (!updatedObj) return res.status(404).json({ message: "Leçon non trouvée" });
    res.json(updatedObj);
  } catch (err) {
    res.status(400).json({ message: "Erreur de mise à jour", error: err.message });
  }
};

exports.deleteLesson = async (req, res) => {
  try {
    const deletedObj = await Lesson.findByIdAndDelete(req.params.id);
    if (!deletedObj) return res.status(404).json({ message: "Leçon non trouvée" });
    res.json({ message: "Leçon supprimée avec succès" });
  } catch (err) {
    res.status(500).json({ message: "Erreur de suppression", error: err.message });
  }
};