const express = require("express");
const router = express.Router();
const userController = require("../controllers/userController");

const protect = require("../middlewares/authMiddleware");
const authorize = require("../middlewares/roleMiddleware");

router.post("/ajouter", protect, authorize(["admin"]), userController.ajouterUtilisateur);
router.get("/list", protect, authorize(["admin"]), userController.listerUtilisateurs);
router.get("/students", protect, authorize(["teacher"]), userController.getStudentsForTeacher);

router.get("/:id",protect, authorize(["admin"]), userController.getUtilisateurById);
router.put("/:id", protect, authorize(["admin"]),userController.updateUtilisateur);
router.delete("/:id",protect, authorize(["admin"]), userController.deleteUtilisateur);

module.exports = router;

