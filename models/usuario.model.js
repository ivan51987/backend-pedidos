const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const UsuarioSchema = new mongoose.Schema({
  nombre: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  role: { type: String, enum: ['admin', 'vendedor'], default: 'vendedor' },
  tenantId: { type: mongoose.Schema.Types.ObjectId, ref: 'Tenant', required: true }
}, { timestamps: true });

UsuarioSchema.pre('save', async function (next) {
  if (!this.isModified('password')) return next();
  this.password = await bcrypt.hash(this.password, 10);
  next();
});

UsuarioSchema.methods.comparePassword = function (inputPassword) {
  return bcrypt.compare(inputPassword, this.password);
};

module.exports = mongoose.model('Usuario', UsuarioSchema);
