import mongoose from "mongoose";
const cartSchema=mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true
    },
    productList:[{
        productId:mongoose.Schema.ObjectId,
        productName:{
            type:String,
            required:true
        },
        productPrice:{
            type:Number,
            required:true
        },
        productImage:{
            type:String,
            required:true
        },
        productQty:{
            type:Number,
            required:true
        }
    }]
})
const Cart=mongoose.model('cart',cartSchema);
export default Cart