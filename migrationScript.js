require('dotenv').config()
const mongoose = require('mongoose');
const Products = require('./models/productModel')

mongoose.connect(process.env.DB_URI)
.then(()=>{console.log('connected')})
.catch(error => console.log(error))

const updateProductSchema =  async ()=>{
    const products = await Products.find();
    for(let product of products){
        product.quantity = 1;
        await product.save()
    }
}



updateProductSchema().then(() => {
    console.log('Products updated successfully');
    mongoose.connection.close();
  }).catch((error) => {
    console.error('Error updating products:', error);
    mongoose.connection.close();
  });