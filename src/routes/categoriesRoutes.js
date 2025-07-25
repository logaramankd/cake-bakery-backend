const express = require('express');
const router = express.Router();
const { createCategory, createSubcategory, getAllCategories } = require('../controllers/categoriesController');
const { authenticateToken, authorizeAdmin } = require('../middleware/authMiddleware');
router.post('/category', authenticateToken, authorizeAdmin, createCategory)
router.post('/subcategory', authenticateToken, authorizeAdmin, createSubcategory)
router.get('/categories', getAllCategories)
module.exports = router;