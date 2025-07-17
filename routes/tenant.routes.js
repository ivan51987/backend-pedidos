const express = require('express');
const router = express.Router();
const tenantController = require('../controllers/tenant.controller');
const { requireRole } = require('../middleware/roles.middleware');
const { authMiddleware } = require('../middleware/auth.middleware');

router.get('/:codigo', tenantController.obtenerTenants);

router.use(authMiddleware);
router.post('/', requireRole('superadmin'), tenantController.crearTenant);

module.exports = router;