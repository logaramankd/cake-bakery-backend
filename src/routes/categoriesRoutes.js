const express = require('express');
const router = express.Router();
const { createCategory, createSubcategory, getAllCategories, updateCategory, deleteCategory, updateSubcategory, deleteSubcategory } = require('../controllers/categoriesController');
const { authenticateToken, authorizeAdmin } = require('../middleware/authMiddleware');
router.post('/category', authenticateToken, authorizeAdmin, createCategory)
router.post('/subcategory', authenticateToken, authorizeAdmin, createSubcategory)
router.get('/categories', getAllCategories)
router.put('/category/:id', authenticateToken, authorizeAdmin, updateCategory);
router.delete('/category/:id', authenticateToken, authorizeAdmin, deleteCategory);

router.put('/subcategory/:id', authenticateToken, authorizeAdmin, updateSubcategory);
router.delete('/subcategory/:id', authenticateToken, authorizeAdmin, deleteSubcategory);


module.exports = router;