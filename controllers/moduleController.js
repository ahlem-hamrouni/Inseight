const Module = require("../models/Module");

exports.addModule = async (req, res, next) => { 
  try { 
    const module = await Module.create({ ...req.body, course: req.params.courseId }); 
    res.status(201).json({ success: true, data: module }); 
  } catch (error) { next(error); } 
}; 
 
exports.updateModule = async (req, res, next) => { 
  try { 
    const module = await Module.findByIdAndUpdate(req.params.id, req.body, { new: true }); 
    res.status(200).json({ success: true, data: module }); 
  } catch (error) { next(error); } 
}; 
 
exports.deleteModule = async (req, res, next) => { 
  try { 
    await Module.findByIdAndDelete(req.params.id); 
    res.status(200).json({ success: true, message: 'Module supprimé' }); 
  } catch (error) { next(error); } 
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
