const mongoose = require('mongoose');
const { ObjectId } = mongoose.Schema.Types;

//relative paths
const Category = require('./categoryModel')

const productSchema = new mongoose.Schema({
    name :{
        required:true,
        type:String
    },
    description: {
        type: String,
        required: true
      },
      price: {
        type: Number,
        required: true
      },
    //   category: {
    //     type: ObjectId,
    //     ref: 'Category',
    //     required: true
    //   },
      review:{
        type: String,
        required: false
      },
      images: {
        type: Array,
        default: []
      },
      quantity:{
        type:Number,
        default: 1
      }
})

module.exports = mongoose.model('product', productSchema)