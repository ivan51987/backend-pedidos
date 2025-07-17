const bitacoraService = require('../services/bitacora.service');

exports.consultarBitacora = async (req, res) => {
  try {
    const registros = await bitacoraService.consultarBitacora(
      req.user.tenantId,
      req.query
    );
    res.json(registros);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};