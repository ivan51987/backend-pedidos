const Pedido = require('../models/pedido.model');
const bitacoraService = require('./bitacora.service');
const { calcularTotalPedido } = require('../utils/helpers');

exports.crearPedido = async (tenantId, userId, pedidoData) => {
  const total = calcularTotalPedido(pedidoData.items);
  
  const pedido = await Pedido.create({
    ...pedidoData,
    total,
    tenantId,
    creadoPor: userId
  });

  await bitacoraService.registrarAccion({
    tenantId,
    usuarioId: userId,
    accion: 'crear',
    entidad: 'pedido',
    entidadId: pedido._id,
    detalles: {
      tipo: pedido.tipo,
      total: pedido.total,
      items: pedido.items.length
    }
  });

  return pedido;
};

exports.cerrarPedido = async (tenantId, pedidoId, userId) => {
  const pedido = await Pedido.findOne({ _id: pedidoId, tenantId });
  if (!pedido) {
    throw new Error('Pedido no encontrado');
  }

  pedido.estado = 'cerrado';
  pedido.cerradoPor = userId;
  await pedido.save();

  await bitacoraService.registrarAccion({
    tenantId,
    usuarioId: userId,
    accion: 'cerrar',
    entidad: 'pedido',
    entidadId: pedido._id,
    detalles: {
      total: pedido.total,
      tiempoAbierto: Date.now() - pedido.createdAt
    }
  });

  return pedido;
};

exports.listarPedidos = async (tenantId, estado) => {
  return await Pedido.find({ tenantId, estado })
    .populate('items.productoId', 'nombre precio')
    .sort({ createdAt: -1 });
};