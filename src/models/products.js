const mongoose = require('../database/config');


const ProductSchema = new mongoose.Schema({
  title:{
    type:String,
    require:true,
  },
  description:{
    type:String,
    require:true,
  },
  price:{
    type:Number,
    require:true,
  },
  company:{
    type:String,
    require:true,
  },
  createdAt:{
    type:Date,
    default:Date.now,
  },
});


const Product = mongoose.model('Product', ProductSchema);

module.exports = Product;
