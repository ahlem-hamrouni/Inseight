const Course = require("../models/Course");
const Departement= require("../models/Departement");
const Teacher= require("../models/Teacher");
exports.getCourses = async (req, res, next) => { 
  try { 
    const courses = await Course.find().populate(' departement').populate ('Teacher'); 
    res.status(200).json({ success: true, data: courses }); 
  } catch (error) { next(error); } 
}; 
 
exports.createCourse = async (req, res, next) => { 
  try { 
    const course = await Course.create({ ...req.body, teacher: req.user.id }); 
    res.status(201).json({ success: true, data: course }); 
  } catch (error) { next(error); } 
}; 
 
exports.updateCourse = async (req, res, next) => { 
  try { 
    const course = await Course.findByIdAndUpdate(req.params.id, req.body, { new: true }); 
    res.status(200).json({ success: true, data: course }); 
  } catch (error) { next(error); } 
}; 
 
exports.deleteCourse = async (req, res, next) => { 
  try { 
    await Course.findByIdAndDelete(req.params.id); 
    res.status(200).json({ success: true, message: 'Cours supprimé' }); 
  } catch (error) { next(error); } 
}; 
 exports.listerCourses = async (req, res) => {
  try {
    const items = await Course.find().populate("departement").populate("teacher");
    res.json(items);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
exports.enrollCourse = async (req, res, next) => { 
  try { 
    const inscription = await Inscription.create({ student: req.user.id, course: req.params.id }); 
    res.status(201).json({ success: true, data: inscription }); 
  } catch (error) { next(error); } 
}; 