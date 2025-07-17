const tenantService = require('../services/tenant.service');

exports.crearTenant = async (req, res) => {
  try {
    const tenant = await tenantService.crearTenant(req.body);
    res.status(201).json(tenant);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

exports.obtenerTenants = async (req, res) => {
  const tenants = await tenantService.obtenerTenants();
  res.json(tenants);
};
