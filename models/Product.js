const mongoose = require("mongoose");

const ProductSchema = new mongoose.Schema({

PName: {
    type: String,
},

PAddress: {
type: String,

},
ImageURL:{
    type:String,
},


Prise:{
    type: Number,
},


    
    });
    
    module.exports = mongoose.model("Product", ProductSchema);
