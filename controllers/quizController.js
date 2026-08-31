const Quiz = require("../models/Quiz");
const Question = require("../models/Question");
const Inscription = require("../models/Inscription");
const QuizAttempt = require("../models/QuizAttempt"); 

exports.listerQuizzes = async (req, res) => {
  try {
    const role = req.user?.role;
    const userId = req.user?.id || req.user?._id;
    const recherche = (req.query.q || req.query.search || "").trim();

    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 5; 
    const skip = (page - 1) * limit;

    let searchQuery = {};
    if (recherche !== "") {
      searchQuery.$or = [
        { title: { $regex: recherche, $options: "i" } },
        { description: { $regex: recherche, $options: "i" } }
      ];
    }
    let filter = { ...searchQuery };

    if (role === 'student') {
      const inscriptions = await Inscription.find({ student: userId });
      const courseIds = inscriptions.map(ins => ins.course);

      filter.course = { $in: courseIds };
      filter.isPublished = true;

    } else if (role === 'teacher') {
      filter.createdBy = userId;
    } 

    const total = await Quiz.countDocuments(filter);
    const quizzes = await Quiz.find(filter)
      .populate("course")
      .populate("createdBy")
      .populate('lesson')
      .skip(skip)
      .limit(limit)
      .lean(); 

    
    const quizzesWithDetails = await Promise.all(
      quizzes.map(async (quiz) => {
        const questionsCount = await Question.countDocuments({ quiz: quiz._id });
        
        let lastAttemptId = null;
        if (role === 'student') {
          const lastAttempt = await QuizAttempt.findOne({
            quiz: quiz._id,
            student: userId
          }).sort({ createdAt: -1 });

          if (lastAttempt) {
            lastAttemptId = lastAttempt._id;
          }
        }

        return {
          ...quiz,
          questionsCount,
          lastAttemptId 
        };
      })
    );

    res.json({
      success: true, 
      quizzes: quizzesWithDetails, 
      total, 
      page, 
      pages: Math.ceil(total / limit) 
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.getQuizById = async (req, res) => {
  try {
    const item = await Quiz.findById(req.params.id).populate("course").populate("createdBy");
    if (!item) return res.status(404).json({ message: "Quiz non trouvé" });
    res.json(item);
  } catch (err) {
    res.status(500).json({ message: "Erreur lors de la récupération", error: err.message });
  }
};

const Course = require('../models/Course');

exports.createQuiz = async (req, res, next) => { 
  try { 
    const courseId = req.params.courseId || req.body.course;
    const userId = req.user?.id || req.user?._id;

    const course = await Course.findById(courseId);
    if (!course) return res.status(404).json({ success: false, message: "Course not found." });

    const isAuthorized = [course.teacher, course.createdBy].some(id => id?.toString() === userId?.toString());
    
    if (req.user?.role !== 'admin' && !isAuthorized) {
      return res.status(403).json({ success: false, message: "Non autorisé pour ce cours." });
    }

    const quiz = await Quiz.create({ 
      ...req.body, 
      course: courseId, 
      createdBy: userId 
    }); 

    res.status(201).json({ success: true, data: quiz }); 
  } catch (error) { next(error); } 
};

exports.publishQuiz = async (req, res, next) => { 
  try { 
    const quiz = await Quiz.findByIdAndUpdate(req.params.id, { isPublished: true }, { new: true }); 
    res.status(200).json({ success: true, data: quiz }); 
  } catch (error) { next(error); } 
}; 

exports.updateQuiz = async (req, res) => {
  try {
    const updatedObj = await Quiz.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
    if (!updatedObj) return res.status(404).json({ message: "Quiz non trouvé" });
    res.json(updatedObj);
  } catch (err) {
    res.status(400).json({ message: "Erreur de mise à jour", error: err.message });
  }
};

exports.deleteQuiz = async (req, res) => {
  try {
    const deletedObj = await Quiz.findByIdAndDelete(req.params.id);
    if (!deletedObj) return res.status(404).json({ message: "Quiz non trouvé" });
    res.json({ message: "Quiz supprimé avec succès" });
  } catch (err) {
    res.status(500).json({ message: "Erreur de suppression", error: err.message });
  }
};