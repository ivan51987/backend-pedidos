const Tenant = require('../models/tenant.model');

exports.crearTenant = async (tenantData) => {
  const existingTenant = await Tenant.findOne({ codigo: tenantData.codigo });
  if (existingTenant) {
    throw new Error('Código de tenant ya existe');
  }

  return await Tenant.create(tenantData);
};

exports.obtenerTenants = async () => {
  return await Tenant.find({}, { nombre: 1, codigo: 1, logoUrl: 1 });
};