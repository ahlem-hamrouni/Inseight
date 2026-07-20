const express = require("express");
const router = express.Router();
const performanceMetricController = require("../controllers/performanceMetricController");

const protect = require("../middlewares/authMiddleware");
const authorize = require("../middlewares/roleMiddleware");

router.post("/ajouter", protect, authorize(["admin", "teacher"]),performanceMetricController.ajouterMetric);
router.get("/list",protect, authorize(["admin", "teacher"]), performanceMetricController.listerMetrics);
router.get("/:id", protect, authorize(["admin", "teacher", "student"]),performanceMetricController.getMetricById);
router.put("/:id",protect, authorize(["admin", "teacher"]), performanceMetricController.updateMetric);
router.delete("/:id", protect, authorize(["admin", "teacher"]),performanceMetricController.deleteMetric);

module.exports = router;