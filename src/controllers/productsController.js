const { json } = require('express');
const Product = require('../models/Product')
const ProductVariant = require('../models/ProductVariant')

const createProduct = async (req, res) => {
    try {
        const { name, description, category_id, subcategory_id, variants } = req.body;

        if (!variants) {
            return res.status(400).json({ message: 'Variants are required' });
        }

        const imageUrl = req.file ? `/uploads/${req.file.filename}` : null

        const product = await Product.query().insert({
            name,
            description,
            category_id,
            subcategory_id,
            image_url: imageUrl,
        })
        const variantsArray = JSON.parse(variants)
        if (!Array.isArray(variantsArray) || variantsArray.length === 0) {
            return res.status(400).json({ message: 'Variants must be a non-empty array' });
        }
        for (const variant of variantsArray) {
            await ProductVariant.query().insert({
                product_id: product.id,
                variant_name: variant.variant_name,
                price: variant.price,
            })
        }
        res.status(201).json({ message: 'Product created successfully', product, variants: variantsArray });
    } catch (error) {
        console.error('Error creating product:', error)
        res.status(500).json({ message: 'Internal server error' })
    }

}
const getAllProducts = async (req, res) => {
    try {
        const products = await Product.query().withGraphFetched('[category, subcategory,variants]')
        res.status(200).json({ products })
    } catch (error) {
        console.error('Error fetching products:', error)
        res.status(500).json({ message: 'Internal server error' })
    }
}
const getProductById = async (req, res) => {
    try {
        const { id } = req.params;
        const product = await Product.query()
            .findById(id)
            .withGraphFetched('variants');

        if (!product) {
            return res.status(404).json({ message: 'Product not found' });
        }

        res.status(200).json({ product });
    } catch (error) {
        console.error('Error fetching product by ID:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
};
const updateProduct = async (req, res) => {
    try {
        const { id } = req.params;
        const { name, description, category_id, subcategory_id } = req.body;
        const image_url = req.file ? `/uploads/${req.file.filename}` : undefined;

        const updatedProduct = await Product.query().patchAndFetchById(id, {
            name,
            description,
            category_id,
            subcategory_id,
            ...(image_url && { image_url }),
        });

        if (!updatedProduct) {
            return res.status(404).json({ message: 'Product not found' });
        }

        res.status(200).json({ message: 'Product updated successfully', product: updatedProduct });
    } catch (error) {
        console.error('Error updating product:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
};
const updateVariants = async (req, res) => {
    try {
        const { id } = req.params; // product_id
        const variantsArray = JSON.parse(req.body.variants); // expects updated array

        for (const variant of variantsArray) {
            if (variant.id) {
                // existing variant
                await ProductVariant.query().patchAndFetchById(variant.id, {
                    variant_name: variant.variant_name,
                    price: variant.price
                });
            } else {
                // new variant
                await ProductVariant.query().insert({
                    product_id: id,
                    variant_name: variant.variant_name,
                    price: variant.price
                });
            }
        }

        res.status(200).json({ message: 'Variants updated successfully' });
    } catch (error) {
        console.error('Error updating variants:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
};
const deleteProduct = async (req, res) => {
    try {
        const { id } = req.params;

        const deletedRows = await Product.query().deleteById(id);

        if (deletedRows === 0) {
            return res.status(404).json({ message: 'Product not found' });
        }

        res.status(200).json({ message: 'Product and its variants deleted' });
    } catch (error) {
        console.error('Error deleting product:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
};
const deleteVariant = async (req, res) => {
    try {
        const { productId, variantId } = req.params;

        const variant = await ProductVariant.query()
            .findById(variantId)
            .where('product_id', productId);

        if (!variant) {
            return res.status(404).json({ message: 'Variant not found' });
        }

        await ProductVariant.query().deleteById(variantId);

        res.status(200).json({ message: 'Variant deleted successfully' });
    } catch (error) {
        console.error('Error deleting variant:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
};

module.exports = {
    createProduct,
    getAllProducts,
    getProductById,
    updateProduct,
    updateVariants,
    deleteProduct,
    deleteVariant
}