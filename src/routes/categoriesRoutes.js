const express = require('express');
const { createCategory, createSubcategory, getAllCategories } = require('../controllers/categoriesController');
const router = express.Router();
router.post('/category', createCategory)
router.post('/subcategory', createSubcategory)
router.get('/categories', getAllCategories)
module.exports = router;