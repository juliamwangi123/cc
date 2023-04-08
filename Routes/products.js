const{Router} = require('express');


const {addProducts,getProducts,productDetails,updateProduct}= require('../Controllers/productController')

const router = Router();

router.get('/', getProducts );

router.post('/', addProducts);

router.get('/:id', productDetails)

router.patch('/:id', updateProduct);

module.exports =router;