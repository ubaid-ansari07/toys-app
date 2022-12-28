import mongoose from "mongoose";
const orderSchema=mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true
    },
    total:{
        type:Number,
        required:true,
    },
    date:{
        type:Date,
        required:true
    },
    deliveryAddress:{
        type:String,
        required:true
    },
    status:{
        type:String,
        required:true
    },
    items:[]
})
export const Order=new mongoose.model('order',orderSchema)