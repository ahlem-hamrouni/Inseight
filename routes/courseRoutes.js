const express = require("express");
const router = express.Router();
const courseController = require("../controllers/courseController");

const upload = require("../middlewares/upload"); 
const protect = require("../middlewares/authMiddleware"); 
const authorize = require("../middlewares/roleMiddleware");

router.post("/create",protect, authorize(["teacher","admin"]) , upload.single("image"), courseController.createCourse);
router.post('/:id/enroll', protect, authorize('student'),courseController.enrollCourse); 
router.get("/list", protect, authorize(["student", "teacher", "admin"]),courseController.listerCourses);
router.get('/',courseController.getCourses); 
router.put("/:id",protect, authorize(["teacher", "admin"]), courseController.updateCourse);

router.delete("/:id",protect, authorize(["teacher", "admin"]), courseController.deleteCourse);


module.exports = router;