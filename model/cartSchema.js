import mongoose from "mongoose";
const cartSchema=mongoose.Schema({
    productName:{
        type:String,
        required:true
    },
    productPrice:{
        type:String,
        required:true
    },
    productQty:{
        type:Number,
        required:true
    },
    productImage:{
        type:String,
    },
    name:{
        type:String,
        required:true
    },
    address:{
        type:String,
        required:true
    },
})
const Cart=mongoose.model('cart',cartSchema);
export default Cart