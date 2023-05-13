const mongoose = require('mongoose');
const { ObjectId } = mongoose.Schema.Types;

//relative paths
const Category = require('./categoryModel')

const productSchema = new mongoose.Schema({
    title :{
        // required:true,
        type:String
    },
    price: {
      type: Number,
      // required: true
    },
    description: {
        type: String,
        // required: true
      },
     
      category: {
        type: String,
        // ref: 'Category',
        // required: true
      },
      review:{
        type: String,
        // required: false
      },
      images: {
        type: String,
        // default: []
      },
      // quantity:{
      //   type:Number,
      //   default: 1,
      //   required:true
      // }
})

module.exports = mongoose.model('product', productSchema)