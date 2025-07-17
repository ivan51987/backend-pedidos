const express = require('express');
const router = express.Router();
const pedidoController = require('../controllers/pedido.controller');
const { requireRole } = require('../middleware/roles.middleware');

router.post('/', requireRole('mesero', 'admin'), pedidoController.crearPedido);
router.get('/', requireRole('mesero', 'admin', 'cocina'), pedidoController.listarPedidos);
router.patch('/:id/cerrar', requireRole('mesero', 'admin'), pedidoController.cerrarPedido);

module.exports = router;