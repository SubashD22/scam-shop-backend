const asyncHandler = require('express-async-handler');
const Banner = require('../models/banner');
const Product = require('../models/product')

const banner = (asyncHandler(async(req,res)=>{
    const{saleName,discount,timePeriod,slug} = req.body;
    const banner = await Banner.find({});
    console.log(banner.length)
    if(banner.length === 1){
        const newBanner= await Banner.findByIdAndUpdate(banner[0]._id,{
            saleName,
            discount:parseInt(discount),
            timePeriod,
            slug,
            image:req.files.image[0].path,
            imageId:req.files.image[0].filename,
        },{new:true});
        if(newBanner){
            await Product.findOneAndUpdate({slug:newBanner.slug},{discount:parseInt(newBanner.discount)});
            await Product.updateMany({slug:{$ne:newBanner.slug}},{discount:0})
            res.status(200).json(newBanner)
        }else{
            res.status(400)
            throw new Error('product not found')
        }
    }else if(banner.length === 0){
        const newBanner= await Banner.create({
            saleName,
            discount:parseInt(discount),
            timePeriod,
            slug,
            image:req.files.image[0].path,
            imageId:req.files.image[0].filename,
        });
        if(newBanner){
            await Product.findOneAndUpdate({slug:newBanner.slug},{discount:parseInt(newBanner.discount)});
            await Product.updateMany({slug:{$ne:newBanner.slug}},{discount:0})
            res.status(200).json(newBanner)
        }else{
            res.status(400)
            throw new Error('product not found')
        }
    }
}));
const getBanner = (asyncHandler(async(req,res)=>{
   
    try {
        const banner = await Banner.find({});
        if(banner){
            res.status(200).json(banner[0])
        }
    } catch (error) {
        console.log(error)
        res.status(400).send(error.message)
    }
}))


module.exports = {banner,getBanner}