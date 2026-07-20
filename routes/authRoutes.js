const express = require("express");
const router = express.Router();

const { register, login, getProfil , updateProfil } = require("../controllers/authController");
const protect = require("../middlewares/authMiddleware");
const authorize = require("../middlewares/roleMiddleware");
const courseController = require("../controllers/courseController");

router.post("/register", register);
router.post("/login", login);
router.post("/ajouterCourse",protect , courseController.ajouterCourse);

router.get("/list", protect,authorize(["admin"]), (req, res) => {
  res.json({ message: "Profil utilisateur", user: req.user });
});

router.get(
  "/admin",
  protect,
  authorize(["admin"]),
  (req, res) => {
    res.json({ message: "Espace administrateur" });
  }
);


module.exports = router;
