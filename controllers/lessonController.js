const Lesson = require ("../models/Lesson");

exports.addLesson = async (req, res, next) => { 
  try { 
    const lesson = await Lesson.create({ ...req.body, module: req.params.moduleId }); 
    res.status(201).json({ success: true, data: lesson }); 
  } catch (error) { next(error); } 
}; 
 
exports.updateLesson = async (req, res, next) => { 
  try { 
    const lesson = await Lesson.findByIdAndUpdate(req.params.id, req.body, { new: true }); 
    res.status(200).json({ success: true, data: lesson }); 
  } catch (error) { next(error); } 
}; 
 
exports.deleteLesson = async (req, res, next) => { 
  try { 
    await Lesson.findByIdAndDelete(req.params.id); 
    res.status(200).json({ success: true, message: 'Leçon supprimée' }); 
  } catch (error) { next(error); } 
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
