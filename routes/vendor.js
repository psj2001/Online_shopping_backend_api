const express = require('express');
const User = require('../model/vendor');
const Vendor = require('../model/vendor');
const bcrypt = require('bcryptjs');
const vendorRouter = express.Router();
const jwt = require('jsonwebtoken');

vendorRouter.post('/api/vendor/signup', async (req, res) => {
    try {
        const { fullName, email, password } = req.body;

        const existingEmail = await Vendor.findOne({ email });
        if (existingEmail) {
            return res.status(400).json({ msg: 'Vendor with the same email already exists' });
        } else {
            //Generate a salt with a cost factor of 10
            const salt = await bcrypt.genSalt(10);
            //hash the password using the generated salt 
            const hashedPassword = await bcrypt.hash(password,salt);
            let vendor = new Vendor({ fullName, email, password:hashedPassword });
            await vendor.save();
            res.json({ vendor });
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }

    
});

//sign in api

vendorRouter.post('/api/vendor/signin', async (req, res) => {
    try {
        const {email, password} = req.body;

        const findVendor = await Vendor.findOne({ email });
        if (!findVendor) {
            return res.status(400).json({ msg: 'Vendor not found in this email' });
        } else {
      const isMatching =    await bcrypt.compare(password,findVendor.password);
      if(!isMatching){
        return res.status(400).json({msg:'Incorrect password'});
      }else{
        const token = jwt.sign({id:findVendor._id},"passwordKey");
        // remove sensitive information
        const {password, ...vendorWithoutPassword } = findVendor._doc;

        //send response 
        res.json({token,vendor:vendorWithoutPassword});

      }
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});
module.exports = vendorRouter;