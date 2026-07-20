const express = require("express");
const router = express.Router();
const choiceController = require("../controllers/choiceController");

const protect = require("../middlewares/authMiddleware");
const authorize = require("../middlewares/roleMiddleware");

router.post("/ajouter", protect, authorize(["teacher", "admin"]), choiceController.ajouterChoice);
router.get("/list", protect, authorize(["student", "teacher", "admin"]), choiceController.listerChoices);
router.get("/:questionId", protect, authorize(["student", "teacher", "admin"]), choiceController.listerChoicesParQuestion);
router.get("/:id", protect, authorize(["student", "teacher", "admin"]), choiceController.getChoiceById);
router.put("/:id", protect, authorize(["teacher", "admin"]), choiceController.updateChoice);
router.delete("/:id", protect, authorize(["teacher", "admin"]), choiceController.deleteChoice);



module.exports = router;