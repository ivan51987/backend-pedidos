const mongoose = require('mongoose');

const TenantSchema = new mongoose.Schema({
  nombre: { type: String, required: true },
  codigo: { type: String, required: true, unique: true },
  logoUrl: { type: String },
  colorPrimario: { type: String }
}, { timestamps: true });

module.exports = mongoose.model('Tenant', TenantSchema);
