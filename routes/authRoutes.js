const express = require("express");
const router = express.Router();

const { register, login, logout , updateProfile  } = require("../controllers/authController");
const protect = require("../middlewares/authMiddleware");
const authorize = require("../middlewares/roleMiddleware");
const { changePassword } = require("../controllers/authController");

router.post("/register", register);
router.post("/login", login);
router.post('/logout', protect, logout); 
router.put('/profile', protect, updateProfile); 
router.patch('/change-password', protect, changePassword); 
router.get("/list", protect,authorize(["admin"]), (req, res) => {res.json({ message: "Profil utilisateur", user: req.user });});
router.get("/admin",protect,authorize(["admin"]),(req, res) => {res.json({ message: "Espace administrateur" });});


module.exports = router;
