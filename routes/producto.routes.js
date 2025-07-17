const express = require('express');
const router = express.Router();
const productoController = require('../controllers/producto.controller');
const { requireRole } = require('../middleware/roles.middleware');

router.post('/', requireRole('admin'), productoController.crearProducto);
router.get('/', requireRole('mesero', 'admin', 'cocina'), productoController.listarProductos);
router.delete('/:id', requireRole('admin'), productoController.eliminarProducto);

module.exports = router;