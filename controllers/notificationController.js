const Notification = require("../models/Notification");
const Recommendation = require("../models/Recommendation");
const AuditLog = require("../models/AuditLog");

exports.getNotifications = async (req, res, next) => { 
try { 
const notifications = await Notification.find({ user: req.user.id }).sort({ createdAt: -1 }); 
res.status(200).json({ success: true, data: notifications }); 
} catch (error) { next(error); } 
}; 
exports.markAsRead = async (req, res, next) => { 
try { 
const notif = await Notification.findByIdAndUpdate(req.params.id, { isRead: true }, { new: 
true }); 
res.status(200).json({ success: true, data: notif }); 
} catch (error) { next(error); } 
}; 
exports.getRecommendations = async (req, res, next) => { 
try { 
const recommendations = await Recommendation.find({ student: req.user.id }); 
res.status(200).json({ success: true, data: recommendations }); 
} catch (error) { next(error); } 
}; 
exports.logAudit = async (userId, action, entity, entityId, ipAddress) => { 
await AuditLog.create({ user: userId, action, entity, entityId, ipAddress }); 
};