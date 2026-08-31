const express = require("express");
const router = express.Router();
const quizAttemptController = require("../controllers/quizAttemptController");

const protect = require("../middlewares/authMiddleware");
const authorize = require("../middlewares/roleMiddleware");

router.post('/start/:quizId', protect, authorize('student'), quizAttemptController.takeQuiz); 
router.post('/submit/:quizId', protect, authorize('student'), quizAttemptController.submitAnswers);
router.get("/course-score/:courseId", protect, authorize('student'), quizAttemptController.getStudentScoreForCourse);
router.get('/:attemptId', protect, authorize(['student', 'teacher', 'admin']), quizAttemptController.getAttemptById); 

module.exports = router;
