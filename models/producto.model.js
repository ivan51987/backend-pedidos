const mongoose = require('mongoose');

const ProductoSchema = new mongoose.Schema({
  nombre: { type: String, required: [true, 'El nombre es requerido'] },
  descripcion: String,
  precio: { type: Number, required: [true, 'El precio es requerido'], min: [0, 'El precio no puede ser negativo']  },
  categoria: String,
  tenantId: { type: mongoose.Schema.Types.ObjectId, ref: 'Tenant', required: true }
}, { timestamps: true });

module.exports = mongoose.model('Producto', ProductoSchema);
