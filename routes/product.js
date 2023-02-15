const express = require('express');
const router = express.Router()
const {parser} = require('../config/cloudinary');
const { newpost,getProducts, getAllProducts, getProduct } = require('../controllers/products');

router.post('/products',parser.fields([{name:'image',maxCount:1}]),newpost);
router.get('/products',getProducts);
router.get('/products/:id',getProduct);
router.get('/allproducts',getAllProducts);

module.exports = router