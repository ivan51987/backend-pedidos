const express = require('express');
const router = express.Router();
const dashboardController = require('../controllers/dashboard.controller');
const { requireRole } = require('../middleware/roles.middleware');

router.get('/resumen', requireRole('admin'), dashboardController.resumenDiario);

module.exports = router;