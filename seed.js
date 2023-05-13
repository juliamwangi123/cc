const mongoose = require('mongoose');
const Product = require('./models/productModel')
const axios = require ('axios');
require('dotenv').config()


mongoose.connect(process.env.DB_URI)
.then(()=>{
    console.log("connected")
}).catch(error=>{
    console.log(error)
})
//fetch data  from fake api store

const seedProducts = async () =>{
  const products = await axios.get('https://fakestoreapi.com/products')
   return products.data

}

const seedDb = async () =>{
    const products = await seedProducts()
    await Product.insertMany(products)
}

seedDb().then(()=>{
    mongoose.connection.close();
})