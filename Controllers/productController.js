
const { default: mongoose } = require('mongoose')
const Product = require('../models/productModel');
const cloudinary = require('cloudinary').v2;


// Configuration 
cloudinary.config({
  cloud_name: "dsvqxl3uk",
  api_key: "679389975872345",
  api_secret: "BfGXZ2JwMORE6C0ocbsguisMh6I"
});

// Function for uploading image to Cloudinary
const uploadImageToCloudinary = async (imageFile) => {
    try {
      const result = await cloudinary.uploader.upload(imageFile, {
        folder: 'Commerce',
        use_filename: true
      });
      return result.secure_url;
    } catch (error) {
      console.error(error);
    }
  };
  


//get products

const getProducts = async (req, res)=>{
    try{
        const products = await  Product.find();
        res.status(200).json({products})

    }catch(error){
        res.status(404).json({error: error.message})
    }
}

//post tweet 
const addProducts = async(req, res)=>{
    const {name,description,price,review,images}= req.body;

    // Upload image to Cloudinary and get image URL
  const imageUrl = await uploadImageToCloudinary(images);
    
  // Create new product document
  const newProduct = new Product({
    name,
    description,
    price,
    review,
    imageUrl
  });
    try{
        // /Save new product document to MongoDB
         const savedProduct = await newProduct.save();
        res.status(200).json({savedProduct, message:'product succesfully created'})
    }
    catch(error){
        res.status(400).json({error: error.message})
    }
}

//get single product info

const  productDetails = async(req, res) =>{
    const{id} = req.params

    // use mongoose to check id validilty in mongo db
    if(!mongoose.isValidObjectId(id)){
        res.status(404).json({error: 'product not found'})
    }
    const product = await Product.findById(id)

        if(!product) res.status(404).json({error:"Product not found "})

        res.status(200).json(product)   
}

//update a product

const updateProduct = async (req, res)=>{
    const{id} = req.params;

    // check id validity
    if(!mongoose.isValidObjectId(id)){
        res.status(404).json({error: "cannot update product not found"});
    }

    const updateProduct = await Product.findOneAndUpdate({_id:id},{...req.body});

    if(!updateProduct)
     { res.status(400).json({error: "cannot update product not found"})}

     res.status(200).json({updateProduct,message:"succefully updated"})


}

module.exports={addProducts,getProducts,productDetails,updateProduct}