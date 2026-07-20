// controllers/userController.js
const User = require("../models/User");
const Teacher = require("../models/Teacher");
const Student = require("../models/Student");
const Admin = require("../models/Admin");
const bcrypt = require("bcrypt");


exports.ajouterUtilisateur = async (req, res) => {
  try {
    const { role } = req.body; // nchoufu el role li jè mel body
    let nouvelUser;
const salt = await bcrypt.genSalt(10);
req.body.password = await bcrypt.hash(req.body.password, salt);
    if (role === "teacher") {
      nouvelUser = new Teacher(req.body);
    } else if (role === "student") {
      nouvelUser = new Student(req.body); 
    } else if (role === "admin") {
      nouvelUser = new Admin(req.body);   
    } else {
      nouvelUser = new User(req.body);    
    }

   
    await nouvelUser.save();
    res.status(201).json(nouvelUser);
  } catch (err) {
    res.status(400).json({ message: "Erreur d’ajout", error: err.message });
  }
};

exports.listerUtilisateurs = async (req, res) => {
  try {
    const users = await User.find();
    res.json(users);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};


exports.getUtilisateurById = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);

    if (!user) {
      return res.status(404).json({ message: "Utilisateur non trouvé" });
    }

    res.json(user);
  } catch (err) {
    res.status(500).json({ message: "Erreur lors de la récupération", error: err.message });
  }
};


exports.updateUtilisateur = async (req, res) => {
  try {
    const updatedUser = await User.findByIdAndUpdate(
      req.params.id,
      req.body,
      {
        new: true,          
        runValidators: true 
      }
    );

    if (!updatedUser) {
      return res.status(404).json({ message: "Utilisateur non trouvé" });
    }

    res.json(updatedUser);
  } catch (err) {
    res.status(400).json({ message: "Erreur de mise à jour", error: err.message });
  }
};


exports.deleteUtilisateur = async (req, res) => {
  try {
    const deletedUser = await User.findByIdAndDelete(req.params.id);

    if (!deletedUser) {
      return res.status(404).json({ message: "Utilisateur non trouvé" });
    }

    res.json({ message: "Utilisateur supprimé avec succès" });
  } catch (err) {
    res.status(500).json({ message: "Erreur de suppression", error: err.message });
  }
};
