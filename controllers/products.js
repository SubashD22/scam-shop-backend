const asyncHandler = require('express-async-handler');
const Product = require('../models/product');

const newpost = (asyncHandler(async(req,res)=>{
    const{name,description,price} = req.body;

    const newProduct = await Product.create({
        name,
        description,
        price: parseInt(price),
        image:req.files.image[0].path,
        imageId:req.files.image[0].filename,
    });
    if(newProduct){
        res.status(200).json(newProduct)
    }else{
        res.status(400)
        throw new Error('product not found')
    }
}));
const getProducts = (asyncHandler(async(req,res)=>{
   
    try {
        const Products = await Product.find({}).limit(3);
        if(Products){
            res.status(200).json(Products)
        }
    } catch (error) {
        console.log(error)
        res.status(400).send(error.message)
    }
}));
const getProduct = (asyncHandler(async(req,res)=>{
      const {id} = req.params
    try {
        const Products = await Product.findOne({slug:id})
        if(Products){
            res.status(200).json(Products)
        }
    } catch (error) {
        console.log(error)
        res.status(400).send(error.message)
    }
}))
const getAllProducts = (asyncHandler(async(req,res)=>{
   
    try {
        const Products = await Product.find({});
        if(Products){
            res.status(200).json(Products)
        }
    } catch (error) {
        console.log(error)
        res.status(400).send(error.message)
    }
}))
module.exports = {newpost,getProducts,getAllProducts,getProduct}