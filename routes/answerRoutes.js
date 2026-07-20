const express = require("express");
const router = express.Router();
const answerController = require("../controllers/answerController");

const protect = require("../middlewares/authMiddleware");
const authorize = require("../middlewares/roleMiddleware");

router.post("/ajouter", protect, authorize(["student"]), answerController.ajouterAnswer);

router.get("/list", protect, authorize(["student", "teacher", "admin"]), answerController.listerAnswers);
router.get("/:id", protect, authorize(["student", "teacher", "admin"]), answerController.getAnswerById);
router.put("/:id", protect, authorize(["teacher", "admin"]), answerController.updateAnswer);
router.delete("/:id", protect, authorize(["teacher", "admin"]), answerController.deleteAnswer);

module.exports = router;