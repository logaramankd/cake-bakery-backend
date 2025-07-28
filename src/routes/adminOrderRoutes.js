const express = require('express');
const router = express.Router();
const adminOrderController = require('../controllers/adminOrderController');
const { authenticateToken, authorizeAdmin } = require('../middleware/authMiddleware');

router.get('/orders', authenticateToken, authorizeAdmin, adminOrderController.getAllOrders);
router.get('/orders/:id', authenticateToken, authorizeAdmin, adminOrderController.getOrderById);
router.get('/filter-orders', authenticateToken, authorizeAdmin, adminOrderController.filterOrders);


module.exports = router;
