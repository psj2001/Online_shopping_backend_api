// Import the express module (package/dependencies)
const express = require('express');
const mongoose = require('mongoose'); 
const authRouter = require('./routes/auth');
const bannerRouter = require('./routes/banner');
const categoryRouter = require('./routes/category');
const subCategory = require('./routes/sub_category');
const productRouter = require('./routes/product');
const productReviewRouter = require('./routes/product_review');
const cors=require('cors');
const vendorRouter = require('./routes/vendor');
// Define the Port number the server will listen on
const PORT = 3000;

// Create an instance of an express application
// Because it gives us the starting point
const app = express();

//Mongodb string
const DB = "mongodb+srv://pranavputhoor91:9605563880@cluster0.kmw3v.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0"

//middleware - to register routes or to mount routes
app.use(express.json());
app.use(cors());//enable cors for all requests and origins
app.use(authRouter);
app.use(bannerRouter);
app.use(categoryRouter);
app.use(subCategory);
app.use(productRouter);
app.use(productReviewRouter);
app.use(vendorRouter);

mongoose.connect(DB).then(()=>{
    console.log('Mongodb Connected');
});


// Start the server and listen on the specific port
app.listen(PORT, "0.0.0.0", function() {
    console.log(`Server is running on the port ${PORT}`);
   
});
