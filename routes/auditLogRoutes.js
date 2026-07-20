const express = require("express");
const router = express.Router();
const auditLogController = require("../controllers/auditLogController");

const protect = require("../middlewares/authMiddleware");
const authorize = require("../middlewares/roleMiddleware");

router.post("/ajouter", protect, authorize(["admin"]), auditLogController.ajouterAuditLog);
router.get("/list", protect, authorize(["admin"]),auditLogController.listerAuditLogs);
router.get("/:id", protect, authorize(["admin"]),auditLogController.getAuditLogById);
router.put("/:id", protect, authorize(["admin"]), auditLogController.updateAuditLog);
router.delete("/:id", protect, authorize(["admin"]), auditLogController.deleteAuditLog);

module.exports = router;
