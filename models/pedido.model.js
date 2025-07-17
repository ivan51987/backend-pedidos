const mongoose = require('mongoose');

const PedidoSchema = new mongoose.Schema({
  tipo: { type: String, enum: ['mostrador', 'para_llevar'], required: true },
  cliente: String,
  estado: { type: String, enum: ['en_curso', 'cerrado'], default: 'en_curso' },
  items: [{
    productoId: { type: mongoose.Schema.Types.ObjectId, ref: 'Producto' },
    nombre: String,
    cantidad: Number,
    precioUnitario: Number
  }],
  total: Number,
  horaInicio: { type: Date, default: Date.now },
  cerradoPor: { type: mongoose.Schema.Types.ObjectId, ref: 'Usuario' },
  tenantId: { type: mongoose.Schema.Types.ObjectId, ref: 'Tenant', required: true }
}, { timestamps: true });

module.exports = mongoose.model('Pedido', PedidoSchema);
