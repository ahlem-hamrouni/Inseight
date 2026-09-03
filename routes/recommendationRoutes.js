const express = require("express");
const router = express.Router();
const recommendationController = require("../controllers/recommendationController");

const protect = require("../middlewares/authMiddleware");
const authorize = require("../middlewares/roleMiddleware");

router.post("/generate",protect, authorize(["student"]), recommendationController.createRecommendations);
router.get("/student/:studentId", protect, authorize(["student"]),recommendationController.getRecommendations);
router.put("/:id/read", protect, authorize(["student"]),recommendationController.markRecommendationAsRead);
router.put("/read-all", protect, authorize(["student"]),recommendationController.markAllRecommendationsAsRead);

module.exports = router;