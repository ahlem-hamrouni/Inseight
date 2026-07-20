const express = require("express");
const router = express.Router();
const courseController = require("../controllers/courseController");

const upload = require("../middlewares/upload"); 
const protect = require("../middlewares/authMiddleware"); 
const authorize = require("../middlewares/roleMiddleware");

router.post("/ajouter",protect, authorize(["teacher","admin"]) , upload.single("image"), courseController.ajouterCourse);

router.get("/list", protect, authorize(["student", "teacher", "admin"]),courseController.listerCourses);

router.get("/:id", protect, authorize(["student", "teacher", "admin"]),courseController.getCourseById);
router.put("/:id", protect, authorize(["teacher", "admin"]),courseController.updateCourse);
router.delete("/:id",protect, authorize(["teacher", "admin"]), courseController.deleteCourse);


module.exports = router;