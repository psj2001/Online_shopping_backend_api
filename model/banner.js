const mongoose = require('mongoose');

const bannerSchenma = new mongoose.Schema({ 
     Image:{
        type:String,
        required:true,
     }

});

const Banner  =  mongoose .model('Banner',bannerSchenma);
module.exports = Banner;