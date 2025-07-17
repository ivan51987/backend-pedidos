const Bitacora = require('../models/bitacora.model');

exports.registrarAccion = async (datos) => {
  try {
    await Bitacora.create({
      tenantId: datos.tenantId,
      usuarioId: datos.usuarioId,
      accion: datos.accion,
      entidad: datos.entidad,
      entidadId: datos.entidadId,
      detalles: datos.detalles
    });
  } catch (error) {
    console.error('Error al registrar en bitácora:', error);
  }
};

exports.consultarBitacora = async (tenantId, filtros = {}) => {
  const query = { tenantId, ...filtros };
  
  return await Bitacora.find(query)
    .populate('usuarioId', 'nombre email')
    .sort({ createdAt: -1 })
    .limit(100);
};