const express = require('express');
const router = express.Router();
const cartController = require('../controllers/cartController');
const { authenticateToken, authorizeAdmin } = require('../middleware/authMiddleware');

router.post('/', authenticateToken, cartController.addToCart);
router.get('/', authenticateToken, cartController.getUserCart);
router.delete('/:id', authenticateToken, cartController.removeCartItem);

module.exports = router;
