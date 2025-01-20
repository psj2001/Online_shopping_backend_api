const express = require('express');
const Product = require('../model/product');
const productRouter = express.Router();

// Add product route
productRouter.post('/api/add-product', async (req, res) => {
    try {
        const { productName, productPrice, quantity, description, category,vendorId,fullName ,subCategory, image } = req.body;

        // Create product instance
        const product = new Product({
            productName,
            productPrice,
            quantity,
            description,
            category,
            vendorId,
            fullName,
            subCategory,
            image,
        });

        // Save product
        await product.save();
        res.status(201).json({ message: 'Product added successfully!', product });
    } catch (e) {
        if (e.name === 'ValidationError') {
            return res.status(400).json({ error: 'Validation error', details: e.message });
        }
        res.status(500).json({ error: 'Internal server error', details: e.message });
    }
});

productRouter.get('/api/popular-products', async (req, res) => {
    try {
        const product = await Product.find({ popular: true }); // Corrected line
        if (!product || product.length === 0) {
            return res.status(404).json({ error: 'No popular product found' });
        } else {
            res.status(200).json(product);
        }
    } catch (e) {
        res.status(500).json({ error: 'Internal server error', details: e.message });
    }
});

productRouter.get('/api/recommend-products', async (req, res) => {
    try {
        const product = await Product.find({ recommend: true }); // Corrected line
        if (!product || product.length === 0) {
            return res.status(404).json({ error: 'No popular product found' });
        } else {
            res.status(200).json({ product });
        }
    } catch (e) {
        res.status(500).json({ error: 'Internal server error', details: e.message });
    }
});
// New route for retrieving Products by category
productRouter.get('/api/products-by-category/:category', async (req, res) => {
    try {
        const { category } = req.params;
        const products = await Product.find({ category });

        if (!products || products.length === 0) {
            // No products found
            return res.status(404).json({ msg: "Products not found" });
        }

        // Products found
        return res.status(200).json(products);
    } catch (e) {
        // Handle server errors
        return res.status(500).json({ error: e.message });
    }
});

module.exports = productRouter;
