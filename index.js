const express = require('express');
const mongoose = require('mongoose');
const cors=require('cors')
require('dotenv').config();
const app = express();
const db = process.env.MONGO_URI;

const port = process.env.PORT || 5000
mongoose.connect(db,{ useNewUrlParser: true, useUnifiedTopology: true })
.then(()=>console.log('connected to database')).catch((err)=>console.log(err));
app.use(cors(
  {
    origin:["http://localhost:3000","https://scam-shop.vercel.app"]
}
))
app.use(express.json());
app.use(express.urlencoded({extended:true}));


app.use('/api',require('./routes/product'))
app.use('/api',require('./routes/banner'))

app.listen(port,()=>{
    console.log(`connected to port ${port}`)
})