const express = require('express');
const upload = require('../middleware/upload')
const { createProduct, getAllProducts } = require('../controllers/productsController');
const { authenticateToken, authorizeAdmin } = require('../middleware/authMiddleware');
const router = express.Router();
router.post('/product', upload.single('image'), authenticateToken, authorizeAdmin, createProduct)
router.get('/products', getAllProducts)
module.exports = router;