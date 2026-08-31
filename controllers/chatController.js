const mongoose = require('mongoose');
const Student = require('../models/Student');
const Course = require('../models/Course');
const QuizAttempt = require('../models/QuizAttempt');
const { generateChatResponse } = require('../services/aiService');

const chat = async (req, res) => {
  try {
    const { message, studentId } = req.body;

    if (!message || typeof message !== 'string' || !message.trim()) {
      return res.status(400).json({ success: false, message: 'Le message est obligatoire.' });
    }
    if (!mongoose.isValidObjectId(studentId)) {
      return res.status(400).json({ success: false, message: 'Identifiant étudiant invalide.' });
    }

    const rawStudent = await Student.findById(studentId).lean();
    if (!rawStudent) {
      return res.status(404).json({ success: false, message: 'Étudiant introuvable.' });
    }

    let averageScore = 0;
    try {
      const attempts = await QuizAttempt.find({ student: studentId });
      if (attempts.length > 0) {
        const sum = attempts.reduce((acc, curr) => acc + curr.score, 0);
        averageScore = Number((sum / attempts.length).toFixed(2)); 
      }
    } catch (err) {
      console.log("Analytics Calculation Error:", err);
      averageScore = 0;
    }

    const student = {
      ...rawStudent,
      name: `${rawStudent.firstName || ''} ${rawStudent.lastName || ''}`.trim() || 'Étudiant',
      level: rawStudent.level || 'L1',
      grade: averageScore,
      status: rawStudent.isActive ? 'Active' : 'Inactive',
      course: rawStudent.course || null
    };

    const courses = await Course.find({ status: 'Active' }).select('name code level status description').lean();
    
    const statistics = { 
      level: student.level, 
      grade: student.grade, 
      averageScore: student.grade,
      status: student.status, 
      currentCourse: student.course?.name || null 
    };

    const answer = await generateChatResponse({ message: message.trim(), student, courses, statistics });
    res.json({ success: true, message: answer });

  } catch (error) {
    console.error("Chat Controller Error:", error);
    res.status(500).json({ success: false, message: 'Erreur serveur lors du traitement de votre demande.' });
  }
};

module.exports = { chat };