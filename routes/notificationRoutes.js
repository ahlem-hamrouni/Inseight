const express = require("express");
const router = express.Router();
const notificationController = require("../controllers/notificationController");

const protect = require("../middlewares/authMiddleware");
const authorize = require("../middlewares/roleMiddleware");

router.post("/ajouter",protect, authorize(["admin"]), notificationController.ajouterNotification);
router.get("/list",protect, authorize(["student", "admin"]), notificationController.listerNotifications);
router.get("/:id",protect, authorize(["student", "admin"]), notificationController.getNotificationById);
router.put("/:id",protect, authorize(["admin"]), notificationController.updateNotification);
router.delete("/:id", protect, authorize(["admin"]),notificationController.deleteNotification);

module.exports = router;