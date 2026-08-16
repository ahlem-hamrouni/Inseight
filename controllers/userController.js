// controllers/userController.js
const User = require("../models/User");
const Teacher = require("../models/Teacher");
const Student = require("../models/Student");
const Admin = require("../models/Admin");
const Course = require("../models/Course");
const Inscription = require("../models/Inscription");
const bcrypt = require("bcrypt");

exports.ajouterUtilisateur = async (req, res) => {
  try {
    const { role } = req.body; 
    let nouvelUser;

    if (req.body.password) {
      const salt = await bcrypt.genSalt(10);
      req.body.password = await bcrypt.hash(req.body.password, salt);
    }

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
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 5;
    const skip = (page - 1) * limit;

    const users = await User.find()
      .select("-password")
      .skip(skip)
      .limit(limit);

    const total = await User.countDocuments();

    res.json({
      users,
      total,
      page,
      pages: Math.ceil(total / limit) || 1,
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};


exports.getStudentsForTeacher = async (req, res) => {
  try {
    const teacherId = req.user?._id || req.user?.id;

    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const skip = (page - 1) * limit;

    const teacherCourses = await Course.find({ teacher: teacherId }).select("_id");
    const courseIds = teacherCourses.map((c) => c._id);

    if (!courseIds || courseIds.length === 0) {
      return res.json({ users: [], total: 0, page: 1, pages: 1 });
    }
    const inscriptions = await Inscription.find({course: { $in: courseIds } }).populate({ path: 'student', select: '-password' });

    const studentMap = new Map();
    inscriptions.forEach((ins) => {
      const st = ins.student || ins.user;
      if (st && st._id) {
        studentMap.set(String(st._id), st);
      }
    });

    const allStudents = Array.from(studentMap.values());
    const total = allStudents.length;

    const paginatedStudents = allStudents.slice(skip, skip + limit);

   
    return res.json({users: paginatedStudents,total,page,pages: Math.ceil(total / limit) || 1, });
  } catch (error) {
    console.error(" Erreur getStudentsForTeacher:", error);
    return res.status(500).json({ message: "Erreur serveur" });
  }
};

exports.getUtilisateurById = async (req, res) => {
  try {
    const user = await User.findById(req.params.id).select("-password");

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
    if (req.body.password) {
      const salt = await bcrypt.genSalt(10);
      req.body.password = await bcrypt.hash(req.body.password, salt);
    }

    const updatedUser = await User.findByIdAndUpdate(req.params.id,req.body,{ new: true, runValidators: true }).select("-password");
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