const dashboardService = require('../services/dashboard.service');

exports.resumenDiario = async (req, res) => {
  try {
    const resumen = await dashboardService.obtenerResumen(req.user.tenantId);
    res.json(resumen);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
