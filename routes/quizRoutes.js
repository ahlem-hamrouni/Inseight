const express = require("express");
const router = express.Router();
const quizController = require("../controllers/quizController");

const protect = require("../middlewares/authMiddleware"); 
const authorize = require("../middlewares/roleMiddleware");

router.post("'/course/:courseId'",protect, authorize(["teacher", "admin"]), quizController.createQuiz);
router.get("/list", protect, authorize(["student", "teacher", "admin"]),quizController.listerQuizzes);
router.get("/:id",protect, authorize(["student", "teacher", "admin"]), quizController.getQuizById);
router.put("/:id", protect, authorize(["teacher", "admin"]),quizController.updateQuiz);
router.put("/:id/publish", protect, authorize(["teacher", "admin"]),quizController.publishQuiz);
router.delete("/:id", protect, authorize(["teacher", "admin"]),quizController.deleteQuiz);

module.exports = router;