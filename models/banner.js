const mongoose = require('mongoose');
const bannerSchema = mongoose.Schema({
    saleName:{
        type:String,
        unique:true,
        required:true
    },
    discount:{
        type:Number,
        required:true
    },
    image:{
        type:String,
        required:true
    },
    imageId:{
        type:String,
        required: true
    },
    timePeriod:{
        type:String,
        required:true
    },
    slug:{
        type:String,
        required:true
    }
},{
    timestamps:true
});

const Banner = mongoose.model('Banner',bannerSchema);
module.exports = Banner 