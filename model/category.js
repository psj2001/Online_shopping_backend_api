const { default: mongoose } = require('mongoose');
const mondoose = require('mongoose');

const categorySchema = new mondoose.Schema({
    name:{
        type: String,
        required: true,
    },
    image:{
        type: String,
        required: true,
    },
    banner:{
        type: String,
        required: true,
    },  
});

const Category = mongoose.model('Category', categorySchema);
module.exports = Category;