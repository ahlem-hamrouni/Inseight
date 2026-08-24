const Departement = require("../models/Departement");

exports.ajouterDepartement = async (req, res) => {
  try {
    const nouvelDept = new Departement(req.body);
    await nouvelDept.save();
    res.status(201).json(nouvelDept);
  } catch (err) {
    res.status(400).json({ message: "Erreur d'ajout", error: err.message });
  }
};

exports.listerDepartements = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 5;
    const skip = (page - 1) * limit;

    const rawSearch = req.query.q || req.query.search || req.query.query || "";
    const recherche = rawSearch.trim();
    const query = {};

    if (recherche !== "") {
      query.$or = [
        { name: { $regex: recherche, $options: "i" } },
        { description: { $regex: recherche, $options: "i" } },
      ];
    }

    // Utilisation de Departement (avec D majuscule selon ton import)
    const departements = await Departement.find(query)
      .skip(skip)
      .limit(limit)
      .sort({ createdAt: -1 });

    const total = await Departement.countDocuments(query);

    res.json({
      departements,
      total,
      page,
      pages: Math.ceil(total / limit) || 1,
    });
  } catch (err) {
    console.error("Erreur listerDepartements:", err);
    res.status(500).json({ error: err.message });
  }
};

exports.getDepartementById = async (req, res) => {
  try {
    const item = await Departement.findById(req.params.id);
    if (!item) return res.status(404).json({ message: "Département non trouvé" });
    res.json(item);
  } catch (err) {
    res.status(500).json({ message: "Erreur lors de la récupération", error: err.message });
  }
};

exports.updateDepartement = async (req, res) => {
  try {
    const updatedDept = await Departement.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
    if (!updatedDept) return res.status(404).json({ message: "Département non trouvé" });
    res.json(updatedDept);
  } catch (err) {
    res.status(400).json({ message: "Erreur de mise à jour", error: err.message });
  }
};

exports.deleteDepartement = async (req, res) => {
  try {
    const deletedDept = await Departement.findByIdAndDelete(req.params.id);
    if (!deletedDept) return res.status(404).json({ message: "Département non trouvé" });
    res.json({ message: "Département supprimé avec succès" });
  } catch (err) {
    res.status(500).json({ message: "Erreur de suppression", error: err.message });
  }
};
  