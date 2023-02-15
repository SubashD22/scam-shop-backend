const express = require('express');
const router = express.Router()
const {parser} = require('../config/cloudinary');
const { banner, getBanner } = require('../controllers/banner');

router.post('/banner',parser.fields([{name:'image',maxCount:1}]),banner);
router.get('/banner',getBanner)

module.exports = router