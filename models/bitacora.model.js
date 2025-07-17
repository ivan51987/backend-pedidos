const mongoose = require('mongoose');

const BitacoraSchema = new mongoose.Schema({
  tenantId: { type: mongoose.Schema.Types.ObjectId, ref: 'Tenant', required: true },
  usuarioId: { type: mongoose.Schema.Types.ObjectId, ref: 'Usuario', required: true },
  modulo: String,
  accion: String,
  descripcion: String,
  fecha: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Bitacora', BitacoraSchema);
