const Usuario = require('../models/usuario.model');
const Tenant = require('../models/tenant.model');
const { generateToken } = require('../utils/jwt');
const bcrypt = require('bcrypt');
const mongoose = require('mongoose');
const ObjectId = mongoose.Types.ObjectId;

exports.register = async (userData) => {
  const { email, password, role, tenantCodigo, nombreUsuario } = userData;

  let tenant = await Tenant.findOne({ codigo: tenantCodigo });

  if (!tenant) {
    tenant = await Tenant.create({
      nombre: `Empresa ${tenantCodigo}`,
      codigo: tenantCodigo,
      logoUrl: `https://default.logo.url/${tenantCodigo}.png`, 
      colorPrimario: '#007bff'
    });
  }

  const existingUser = await Usuario.findOne({ email, tenantId: tenant._id });
  if (existingUser) {
    const error = new Error('El usuario ya existe en este tenant');
    error.status = 400;
    throw error;
  }

  const hashedPassword = await bcrypt.hash(password, 10);
  await Usuario.create({
    nombre: nombreUsuario,
    email,
    password: hashedPassword,
    role,
    tenantId: tenant._id
  });

  return { message: 'Usuario registrado exitosamente' };
};

exports.login = async (credentials) => {
  const { email, password, tenantId } = credentials;
   
  const usuario = await Usuario.findOne({ email, tenantId: new ObjectId(tenantId) });
    
  if (!usuario) {
    throw new Error('Credenciales inválidas');
  }

 
 const isValid = bcrypt.compare(password, usuario.password); 
  
  if (!isValid) {
    throw new Error('Credenciales inválidas');
  }

  const token = generateToken({
    uid: usuario._id,
    tenantId: usuario.tenantId,
    role: usuario.role
  });

  return { token };
};