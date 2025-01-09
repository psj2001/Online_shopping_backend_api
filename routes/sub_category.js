const express = require('express');
const SubCategory = require('../model/sub_category');
const subCategoryRouter = express.Router();

subCategoryRouter.post('/api/sub_categories', async (req, res) => {
    try{
  const {categoryId,categoryName,image,subCategoryName} =req.body; 
  const subCategory = new SubCategory({categoryId,categoryName,image,subCategoryName});
  await subCategory.save();    
  res.status(201).send(subCategory);

    }catch(error){
        return res.status(500).json({ error: error.message });
    }
});

subCategoryRouter.get('/api/category/:categoryName/subcategories', async (req, res) => {
    try{
    
    //extract the category name from the  request Url using  Destructuring
      const {categoryName} = req.params;

      const subCategories = await SubCategory.find({categoryName:categoryName});
      
      //check if any sub_categories where found
      if(!subCategories|| subCategories.length  === 0){
          return res.status(404).send('No sub categories found');
      }else{
          res.status(200).send(subCategories);
      }
    }catch(error){
        return res.status(500).json({ error: error.message });
    }
});
module.exports = subCategoryRouter;