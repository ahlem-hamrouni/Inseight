const QuizAttempt = require("../models/QuizAttempt");
const Inscription  = require("../models/Inscription");
const PerformanceMetric = require("../models/PerformanceMetric");
const DashboardData = require ("../models/DashboardData");


exports.generateForStudent = async (req, res, next) => { 
  try { 
    const studentId = req.user.id; 
    const attempts = await QuizAttempt.find({ student: studentId }); 
    const enrollments = await Inscription.find({ student: studentId }); 
 
    const totalCourses = enrollments.length; 
    const averageScore = attempts.reduce((acc, curr) => acc + curr.score, 0) / 
(attempts.length || 1); 
 
    const dashboard = await DashboardData.findOneAndUpdate( 
      { user: studentId }, 
      { user: studentId, totalCourses, averageScore }, 
      { upsert: true, new: true } 
    ); 
 
    res.status(200).json({ success: true, data: dashboard }); 
  } catch (error) { next(error); } 
}; 
 
exports.generateForTeacher = async (req, res, next) => { 
  try { 
    const metrics = await PerformanceMetric.find({ course: req.params.courseId }); 
    res.status(200).json({ success: true, data: metrics }); 
  } catch (error) { next(error); } 
}; 
 
exports.generateForAdmin = async (req, res, next) => { 
  try { 
    const totalStudents = await Inscription.countDocuments(); 
    res.status(200).json({ success: true, data: { totalStudents } }); 
  } catch (error) { next(error); } 
};