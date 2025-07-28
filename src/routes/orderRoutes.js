const express = require('express');
const router = express.Router();
const orderController = require('../controllers/orderController');
const { authenticateToken, authorizeAdmin } = require('../middleware/authMiddleware');

router.post('/', authenticateToken, orderController.placeOrder);
router.get('/', authenticateToken, orderController.getUserOrders);
router.patch('/:orderId/status', authenticateToken, authorizeAdmin, orderController.updateOrderStatus);

module.exports = router;
