const express = require("express");
const router = express.Router();
const inscriptionController = require("../controllers/inscriptionController");

const protect = require("../middlewares/authMiddleware");
const authorize = require("../middlewares/roleMiddleware");

router.post("/ajouter", protect, authorize(["student"]), inscriptionController.ajouterInscription);
router.get("/list", protect, authorize(["student", "teacher", "admin"]), inscriptionController.listerInscriptions);
router.get("/:id",protect, authorize(["student", "teacher", "admin"]), inscriptionController.getInscriptionById);
router.put("/:id",protect, authorize([ "admin"]), inscriptionController.updateInscription);
router.delete("/:id",protect, authorize([ "admin"]) ,inscriptionController.deleteInscription);

module.exports = router;