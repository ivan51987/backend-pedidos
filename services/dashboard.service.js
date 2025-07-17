const Pedido = require('../models/pedido.model');

exports.obtenerResumen = async (tenantId) => {
  const hoy = new Date();
  hoy.setHours(0, 0, 0, 0);

  const [ventasDiarias, pedidosEnCurso, totalPedidos] = await Promise.all([
    Pedido.aggregate([
      { 
        $match: { 
          tenantId,
          estado: 'cerrado',
          createdAt: { $gte: hoy }
        }
      },
      {
        $group: {
          _id: null,
          total: { $sum: '$total' },
          cantidad: { $sum: 1 }
        }
      }
    ]),
    Pedido.countDocuments({ tenantId, estado: 'en_curso' }),
    Pedido.countDocuments({ 
      tenantId,
      createdAt: { $gte: hoy }
    })
  ]);

  return {
    ventasDiarias: ventasDiarias[0]?.total || 0,
    pedidosCompletados: ventasDiarias[0]?.cantidad || 0,
    pedidosEnCurso,
    totalPedidos
  };
};