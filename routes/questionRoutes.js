const express = require("express");
const router = express.Router();
const questionController = require("../controllers/questionController");

const protect = require("../middlewares/authMiddleware");
const authorize = require("../middlewares/roleMiddleware");

router.post("//:quizId/questions", protect, authorize(["teacher", "admin"]), questionController.addQuestion);
router.get("/list", protect, authorize(["student", "teacher", "admin"]), questionController.listerQuestions);
router.get("/:quizId", protect, authorize(["student", "teacher", "admin"]), questionController.listerQuestionsParQuiz);
router.get("/:id", protect, authorize(["student", "teacher", "admin"]), questionController.getQuestionById);
router.put("/:id", protect, authorize(["teacher", "admin"]), questionController.updateQuestion);
router.delete("/:id", protect, authorize(["teacher", "admin"]), questionController.deleteQuestion);



module.exports = router;