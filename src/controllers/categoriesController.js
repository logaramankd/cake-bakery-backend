const Category = require('../models/Category')
const Subcategory = require('../models/Subcategory')
const createCategory = async (req, res) => {
    try {
        const { name, description } = req.body;
        const category = await Category.query().insert({ name, description })
        res.status(200).json({ category: category })
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
}
const createSubcategory = async (req, res) => {
    try {
        const { name, description, categoryId } = req.body
        const subcategory = await Subcategory.query().insert({ name, description, category_id: categoryId })
        res.status(201).json(subcategory)
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
}
const getAllCategories = async (req, res) => {
    try {
        const categories = await Category.query().withGraphFetched('subcategories');
        res.json({ categories })
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
}
module.exports = { createCategory, createSubcategory, getAllCategories }