const pedidoService = require('../services/pedido.service');

exports.crearPedido = async (req, res) => {
  try {
    const pedido = await pedidoService.crearPedido(req.user.tenantId, req.user.uid, req.body);
    res.status(201).json(pedido);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

exports.listarPedidos = async (req, res) => {
  const estado = req.query.estado || 'en_curso';
  const pedidos = await pedidoService.listarPedidos(req.user.tenantId, estado);
  res.json(pedidos);
};

exports.cerrarPedido = async (req, res) => {
  try {
    const pedido = await pedidoService.cerrarPedido(req.user.tenantId, req.params.id, req.user.uid);
    res.json(pedido);
  } catch (err) {
    res.status(404).json({ error: err.message });
  }
};
