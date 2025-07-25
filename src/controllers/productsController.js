const { json } = require('express');
const Product = require('../models/Product')
const ProductVariant = require('../models/ProductVariant')

const createProduct = async (req, res) => {
    try {
        const { name, description, category_id, subcategory_id, variants } = req.body;
        const imageUrl = req.file ? `/uploads/${req.file.filename}` : null

        const product = await Product.query().insert({
            name,
            description,
            category_id,
            subcategory_id,
            image_url: imageUrl,
        })
        const variantsArray = JSON.parse(variants)
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
        const products = await Product.query().withGraphFetched('variants')
        res.status(200).json({ products })
    } catch (error) {
        console.error('Error fetching products:', error)
        res.status(500).json({ message: 'Internal server error' })
    }
}
module.exports = { createProduct, getAllProducts }