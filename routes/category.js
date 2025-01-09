const express = require('express');
const Category = require('../model/category');

const categoryRouter = express.Router();

categoryRouter.post('/api/categories', async (req, res) => {
    try {
        const { name, image, banner } = req.body;

        // Create a new category
        const category = new Category({ name, image, banner });

        // Save category to database
        await category.save();

        return res.status(201).send(category);
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
});

categoryRouter.get('/api/categories', async (req, res) => {
    try {
        const categories = await Category.find({});
        return res.status(200).json(categories);
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
});

module.exports = categoryRouter;
