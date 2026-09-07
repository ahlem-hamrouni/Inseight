

const User = require("../models/User");
const Student = require("../models/Student");
const Teacher = require("../models/Teacher");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

exports.register = async (req, res) => {
  const { email, password, role, ...rest } = req.body;

  try {
    const userExiste = await User.findOne({ email });
    if (userExiste) {
      return res.status(400).json({ message: "Utilisateur déjà existant avec cet email" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const baseData = { ...rest, email, password: hashedPassword, role };

    let newUser;
    if (role === 'student') {
      newUser = await Student.create({
        firstName: baseData.firstName,
        lastName: baseData.lastName,
        email: baseData.email,
        password: baseData.password,
        phone: baseData.phone,
        studentCode: baseData.studentCode,
        level: baseData.level,
        group: baseData.group,
        birthDate: baseData.birthDate
      });
    } else if (role === 'teacher') {
      newUser = await Teacher.create({
        firstName: baseData.firstName,
        lastName: baseData.lastName,
        email: baseData.email,
        password: baseData.password,
        phone: baseData.phone,
        speciality: baseData.speciality,
        office: baseData.office
      });
    }

    res.status(201).json({ message: "Inscription réussie", user: newUser });

  } catch (error) {
    if (error.code === 11000) {
      const field = Object.keys(error.keyValue)[0];
      return res.status(400).json({ message: `${field} existe déjà dans la base de données.` });
    }
    res.status(500).json({ message: error.message || "Erreur serveur" });
  }
};
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
      { id: user._id, role: user.role, departement: user.departement },
      process.env.JWT_SECRET,
      { expiresIn: "1d" }
    );

    res.json({
      token,
      user: {
        id: user._id,
        _id: user._id,
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
        role: user.role,
        departement: user.departement,
        level: user.level || null,
        studentCode: user.studentCode || null,
        group: user.group || null,
        speciality: user.speciality || null
      }
    });

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.logout = async (req, res) => {
  res.clearCookie('token');
  res.status(200).json({ success: true, message: 'Déconnexion réussie' });
};

exports.updateProfile = async (req, res, next) => {
  try {
    const user = await User.findByIdAndUpdate(req.user.id, req.body, { new: true });
    res.status(200).json({ success: true, data: user });
  } catch (error) { next(error); }
};

exports.changePassword = async (req, res, next) => {
  try {
    const { currentPassword, newPassword } = req.body;
    const user = await User.findById(req.user.id).select('+password');
    const isMatch = await bcrypt.compare(currentPassword, user.password);
    if (!isMatch) return res.status(400).json({ message: 'Mot de passe actuel incorrect' });

    user.password = await bcrypt.hash(newPassword, 10);
    await user.save();
    res.status(200).json({ success: true, message: 'Mot de passe mis à jour' });
  } catch (error) { next(error); }
};



