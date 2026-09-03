const mongoose = require('mongoose');
const Recommendation = require('../models/Recommendation');
const { generateRecommendations } = require('../services/recommendationService');

const validId = (id) => mongoose.isValidObjectId(id);

const getRecommendations = async (req, res) => {
    if (!validId(req.params.studentId)) return res.status(400).json({ success: false, message: 'Identifiant étudiant invalide.' });
    
    
    let data = await Recommendation.find({ student: req.params.studentId }).populate('course', 'title description level duration image');
    if (!data.length) data = await generateRecommendations(req.params.studentId);
    
    res.json({ success: true, data });
};

const createRecommendations = async (req, res) => {
    const { studentId } = req.body;
    if (!validId(studentId)) return res.status(400).json({ success: false, message: 'Identifiant étudiant invalide.' });
    const data = await generateRecommendations(studentId);
    res.status(201).json({ success: true, data });
};

const markRecommendationAsRead = async (req, res) => {
    if (!validId(req.params.id)) return res.status(400).json({ success: false, message: 'Identifiant recommandation invalide.' });
    const recommendation = await Recommendation.findByIdAndUpdate(req.params.id, { status: 'read' }, { new: true });
    if (!recommendation) return res.status(404).json({ success: false, message: 'Recommandation introuvable.' });
    res.json({ success: true, data: recommendation });
};

const markAllRecommendationsAsRead = async (req, res) => {
    const { studentId } = req.body;
    if (!validId(studentId)) return res.status(400).json({ success: false, message: 'Identifiant étudiant invalide.' });
    await Recommendation.updateMany({ student: studentId, status: 'unread' }, { status: 'read' });
    res.json({ success: true, data: [] });
};

module.exports = { getRecommendations, createRecommendations, markRecommendationAsRead, markAllRecommendationsAsRead };