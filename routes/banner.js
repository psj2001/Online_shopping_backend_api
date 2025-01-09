const express = require('express');
const Banner = require('../model/banner');
const bannerRouter = express.Router();

bannerRouter.post('/api/banner', async (req, res) => {
    try {
        const { Image } = req.body;
         
        const banner = new Banner({ Image });

        await banner.save();

        return res.status(201).send(banner);

    } catch (error) {

        res.status(500).json({ error: error.message });

    }
}); 

bannerRouter.get('/api/banner', async (req, res) => {
    try {
      const banners = await Banner.find({});
      return  res.status(200).send(banners);

    } catch (error) {

        res.status(500).json({ error: error.message });

    }
}); 

module.exports = bannerRouter;