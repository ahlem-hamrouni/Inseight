const User = require("../models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");


require("../models/Student"); 
require("../models/Teacher");
require("../models/Admin");


exports.register = async (req, res) => {
  // 2. Na7fdo 3la nafs el-destructuring mta3ek
  const { email, password } = req.body;

  try {
    const userExiste = await User.findOne({ email });
    if (userExiste) {
      return res.status(400).json({ message: "Utilisateur déjà existant" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    
    await User.create({
      ...req.body,
      password: hashedPassword
    });

    res.status(201).json({ message: "Inscription réussie" });

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Connexion (Login)
exports.login = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: "Identifiants invalides" });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: "Identifiants invalides" });
    }

    const token = jwt.sign(
      { id: user._id, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: "1d" }
    );

    res.json({
      token,
      user: {
        id: user._id,
        firstName: user.firstName, 
        lastName: user.lastName,
        email: user.email,
        role: user.role
      }
    });

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
