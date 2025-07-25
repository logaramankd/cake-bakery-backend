const express = require('express');
const upload=require('../middleware/upload')
const { createProduct, getAllProducts } = require('../controllers/productsController');
const router = express.Router();
router.post('/product', upload.single('image'), createProduct)
router.get('/products', getAllProducts)
module.exports = router