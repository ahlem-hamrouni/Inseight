const express = require("express");
const router = express.Router();
const moduleController = require("../controllers/moduleController");

const protect = require("../middlewares/authMiddleware");
const authorize = require("../middlewares/roleMiddleware");

router.post("/course/:courseId",protect, authorize(["teacher", "admin"]), moduleController.addModule);
router.get("/list",protect, authorize(["student", "teacher", "admin"]), moduleController.listerModules);
router.get("/:id",protect, authorize(["student", "teacher", "admin"]), moduleController.getModuleById);
router.put("/:id", protect, authorize(["teacher", "admin"]),moduleController.updateModule);
router.delete("/:id",protect, authorize(["teacher", "admin"]), moduleController.deleteModule);

module.exports = router;