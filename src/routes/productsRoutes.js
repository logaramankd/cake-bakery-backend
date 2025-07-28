const express = require('express');
const router = express.Router();
const upload = require('../middleware/upload')
const {
    createProduct,
    getAllProducts,
    getProductById,
    updateProduct,
    updateVariants,
    deleteProduct,
    deleteVariant
} = require('../controllers/productsController');

router.post('/product', upload.single('image'), createProduct);
router.get('/product', getAllProducts);
router.get('/product/:id', getProductById);
router.put('/product/:id', upload.single('image'), updateProduct);
router.put('/product/:id/variants', updateVariants);
router.delete('/:id', deleteProduct);
router.delete('/product/:productId/variants/:variantId', deleteVariant);

module.exports = router;