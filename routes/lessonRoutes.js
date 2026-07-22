const express = require("express");
const router = express.Router();
const lessonController = require("../controllers/lessonController");

const protect = require("../middlewares/authMiddleware");
const authorize = require("../middlewares/roleMiddleware");

router.post("/:moduleId/lessons",protect, authorize(["teacher", "admin"]), lessonController.addLesson);
router.get("/list", protect, authorize(["student", "teacher", "admin"]), lessonController.listerLessons);
router.get("/:id", protect, authorize(["student","teacher", "admin"]), lessonController.getLessonById);
router.put("/:id",  protect, authorize(["teacher", "admin"]),lessonController.updateLesson);
router.delete("/:id",protect, authorize(["teacher", "admin"]), lessonController.deleteLesson);

module.exports = router;