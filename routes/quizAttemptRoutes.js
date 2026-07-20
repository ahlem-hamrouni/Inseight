const express = require("express");
const router = express.Router();
const quizAttemptController = require("../controllers/quizAttemptController");

const protect = require("../middlewares/authMiddleware");
const authorize = require("../middlewares/roleMiddleware");

router.post("/ajouter", protect, authorize(["student"]),quizAttemptController.ajouterAttempt);
router.get("/list",protect, authorize(["student", "teacher", "admin"]), quizAttemptController.listerAttempts);
router.get("/:id", protect, authorize(["student", "teacher", "admin"]),quizAttemptController.getAttemptById);
router.put("/:id", protect, authorize(["admin"]),quizAttemptController.updateAttempt);
router.delete("/:id", protect, authorize(["admin"]),quizAttemptController.deleteAttempt);

module.exports = router;