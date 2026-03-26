const mongoose=require("mongoose");

const schema=new mongoose.Schema({
    name:String,
    price:Number,
    category:String
},{
    timestamps:true
});

module.exports=mongoose.model("Product",schema);