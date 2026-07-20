const mongoose = require("mongoose");

const auditLogSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  action: { type: String, required: true },
  entity: String,
  entityId: mongoose.Schema.Types.ObjectId,
  ipAddress: String
}, { timestamps: true });

module.exports = mongoose.model("AuditLog", auditLogSchema);