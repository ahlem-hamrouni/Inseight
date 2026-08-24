// controllers/userController.js
const User = require("../models/User");
const Teacher = require("../models/Teacher");
const Student = require("../models/Student");
const Admin = require("../models/Admin");
const Course = require("../models/Course");
const Inscription = require("../models/Inscription");
const Departement = require("../models/Departement");
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

// Fonction générale: filtrage par rôle, search w pagination + Populate Département
exports.listerUtilisateursParRole = async (req, res) => {
  try {
    const role = req.params.role?.toLowerCase();
    const allowedRoles = ["student", "teacher", "admin"];

    if (!allowedRoles.includes(role)) {
      return res.status(400).json({ message: "Rôle invalide. Utilisez student, teacher ou admin." });
    }

    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 5;
    const search = req.query.search || '';
    const skip = (page - 1) * limit;

    const queryFilter = {
      role: role,
      ...(search && {
        $or: [
          { firstName: { $regex: search, $options: 'i' } },
          { lastName: { $regex: search, $options: 'i' } },
          { email: { $regex: search, $options: 'i' } },
        ],
      }),
    };

    const users = await User.find(queryFilter)
      .select("-password")
      .populate("departement") // 👈 Zidna populate hna
      .skip(skip)
      .limit(limit);

    const total = await User.countDocuments(queryFilter);

    return res.json({
      role,
      users,
      total,
      page,
      pages: Math.ceil(total / limit) || 1,
    });
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
};

// Aliases spécialisés kif ma 3mel el-prof
exports.getListStudent = async (req, res) => {
  req.params.role = "student";
  return exports.listerUtilisateursParRole(req, res);
};

exports.getListTeacher = async (req, res) => {
  req.params.role = "teacher";
  return exports.listerUtilisateursParRole(req, res);
};

exports.getListAdmin = async (req, res) => {
  req.params.role = "admin";
  return exports.listerUtilisateursParRole(req, res);
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
    const inscriptions = await Inscription.find({ course: { $in: courseIds } }).populate({
      path: 'student',
      select: '-password',
      populate: { path: 'departement', select: 'name nom' } // 👈 Zidna populate lal-student departement
    });

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

    return res.json({ users: paginatedStudents, total, page, pages: Math.ceil(total / limit) || 1 });
  } catch (error) {
    console.error(" Erreur getStudentsForTeacher:", error);
    return res.status(500).json({ message: "Erreur serveur" });
  }
};

exports.getUtilisateurById = async (req, res) => {
  try {
    const user = await User.findById(req.params.id)
      .select("-password")
      .populate("departement", "name nom"); // 👈 Zidna populate hna

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

    const userToUpdate = await User.findById(req.params.id);
    if (!userToUpdate) {
      return res.status(404).json({ message: "Utilisateur non trouvé" });
    }

    let Model = User;
    if (userToUpdate.role === "student") Model = Student;
    else if (userToUpdate.role === "teacher") Model = Teacher;
    else if (userToUpdate.role === "admin") Model = Admin;

    const updatedUser = await Model.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    )
      .select("-password")
      .populate("departement", "name nom");

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