const express = require('express');
const User = require('../model/user');
const bcrypt = require('bcryptjs');
const authRouter = express.Router();
const jwt = require('jsonwebtoken');

authRouter.post('/api/signup', async (req, res) => {
    try {
        const { fullName, email, password } = req.body;

        const existingEmail = await User.findOne({ email });
        if (existingEmail) {
            return res.status(400).json({ msg: 'User with the same email already exists' });
        } else {
            //Generate a salt with a cost factor of 10
            const salt = await bcrypt.genSalt(10);
            //hash the password using the generated salt 
            const hashedPassword = await bcrypt.hash(password,salt);
            let user = new User({ fullName, email, password:hashedPassword });
            await user.save();
            res.json({ user });
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

//sign in api

authRouter.post('/api/signin', async (req, res) => {
    try {
        const {email, password} = req.body;

        const findUser = await User.findOne({ email });
        if (!findUser) {
            return res.status(400).json({ msg: 'User not found in this email' });
        } else {
      const isMatching =    await bcrypt.compare(password,findUser.password);
      if(!isMatching){
        return res.status(400).json({msg:'Incorrect password'});
      }else{
        const token = jwt.sign({id:findUser._id},"passwordKey");
        // remove sensitive information
        const {password, ...userWithoutPassword } = findUser._doc;

        //send response 
        res.json({token,...userWithoutPassword});

      }
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});
module.exports = authRouter;
      

