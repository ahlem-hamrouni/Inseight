const express = require("express");
const router = express.Router();
const analyticsController = require("../controllers/analyticsController");


const protect = require("../middlewares/authMiddleware");
const authorize = require("../middlewares/roleMiddleware");

router.get('/student', protect, authorize('student'),analyticsController.generateForStudent); 
router.get('/teacher/course/:courseId', protect, authorize('teacher'), analyticsController.generateForTeacher); 
router.get('/admin', protect, authorize('admin'), analyticsController.generateForAdmin); 
router.get('/level', protect, authorize('admin'), analyticsController.getStudentsByLevel); 
router.get('/group', protect, authorize('admin'), analyticsController.getStudentsByGroup); 
router.get('/platform-growth', protect, authorize('admin'), analyticsController.getPlatformGrowth);
module.exports = router;