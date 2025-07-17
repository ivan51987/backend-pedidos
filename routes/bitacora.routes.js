const express = require('express');
const router = express.Router();
const bitacoraController = require('../controllers/bitacora.controller');
const { requireRole } = require('../middleware/roles.middleware');

router.get('/', requireRole('admin'), bitacoraController.consultarBitacora);

module.exports = router;