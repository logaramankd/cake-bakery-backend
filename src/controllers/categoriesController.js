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
const updateCategory = async (req, res) => {
    try {
        const { id } = req.params;
        const { name, description } = req.body;

        const updated = await Category.query().patchAndFetchById(id, { name, description });
        res.json(updated);
    } catch (err) {
        res.status(500).json({ message: 'Error updating category', error: err });
    }
};

const deleteCategory = async (req, res) => {
    try {
        const { id } = req.params;
        await Category.query().deleteById(id);
        res.json({ message: 'Category deleted successfully' });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Error deleting category' });
    }
};


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
const updateSubcategory = async (req, res) => {
    try {
        const { id } = req.params;
        const { name, description, categoryId } = req.body;

        const updated = await Subcategory.query().patchAndFetchById(id, {
            name,
            description,
            category_id: categoryId,
        });

        res.json(updated);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error updating subcategory' });
    }
};

const deleteSubcategory = async (req, res) => {
    try {
        const { id } = req.params;
        await Subcategory.query().deleteById(id);
        res.json({ message: 'Subcategory deleted successfully' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error deleting subcategory' });
    }
};

const getSubcategory = async (req, res) => {
    try {
        const subcategories = await Subcategory.query()
        res.status(200).json({ message: 'All sub categories', subcategories })
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error getting subcategory' });
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
module.exports = {
    createCategory,
    updateCategory,
    deleteCategory,
    createSubcategory,
    updateSubcategory,
    deleteSubcategory,
    getAllCategories,
    getSubcategory
};