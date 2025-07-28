// routes/addonRoutes.js
const express = require('express');
const router = express.Router();
const addonController = require('../controllers/addonController');
const { authenticateToken, authorizeAdmin } = require('../middleware/authMiddleware'); // Protect routes

router.post('/', authenticateToken, authorizeAdmin, addonController.createAddon);
router.get('/', addonController.getAllAddons);
router.get('/:id', addonController.getAddonById);
router.put('/:id', authenticateToken, authorizeAdmin, addonController.updateAddon);
router.delete('/:id', authenticateToken, authorizeAdmin, addonController.deleteAddon);

module.exports = router;
