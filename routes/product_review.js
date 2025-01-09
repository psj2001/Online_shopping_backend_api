const express=require('express');
const ProductReview = require('../model/product_review');

const productReviewRouter = express.Router();

productReviewRouter.post('/api/product_review', async (req, res) => {
    try {
        const { buyerId, email, fullName, productId, rating, review } = req.body;
        const reviews = new ProductReview({ buyerId, email, fullName, productId, rating, review });
        await reviews.save();
        return res.status(201).send({ reviews });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});
productReviewRouter.get('/api/review', async (req, res) => {
    try{
        reviews = await ProductReview.find();
        return res.status(200).send(reviews);

     }catch(e){
        res.status(500).json({ error: error.message });
    }
});
module.exports = productReviewRouter;