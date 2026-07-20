const Course = require("../models/Course");

exports.ajouterCourse = async (req, res) => {
  try {
    const { titre, description, level, duration, teacher, departement } = req.body;
    
    const nouvelObj = new Course({
      titre,
      description,
      level,
      duration,
      teacher,
      departement,
      image: req.file ? req.file.filename : null, 
    });

    await nouvelObj.save(); 
    res.status(201).json(nouvelObj);
  } catch (err) {
    res.status(400).json({ message: "Erreur d'ajout", error: err.message });
  }
};

exports.listerCourses = async (req, res) => {
  try {
    const items = await Course.find().populate("departement").populate("teacher");
    res.json(items);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.getCourseById = async (req, res) => {
  try {
    const item = await Course.findById(req.params.id).populate("departement").populate("teacher");
    if (!item) return res.status(404).json({ message: "Cours non trouvé" });
    res.json(item);
  } catch (err) {
    res.status(500).json({ message: "Erreur lors de la récupération", error: err.message });
  }
};

exports.updateCourse = async (req, res) => {
  try {
    const updatedObj = await Course.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
    if (!updatedObj) return res.status(404).json({ message: "Cours non trouvé" });
    res.json(updatedObj);
  } catch (err) {
    res.status(400).json({ message: "Erreur de mise à jour", error: err.message });
  }
};

exports.deleteCourse = async (req, res) => {
  try {
    const deletedObj = await Course.findByIdAndDelete(req.params.id);
    if (!deletedObj) return res.status(404).json({ message: "Cours non trouvé" });
    res.json({ message: "Cours supprimé avec succès" });
  } catch (err) {
    res.status(500).json({ message: "Erreur de suppression", error: err.message });
  }
};