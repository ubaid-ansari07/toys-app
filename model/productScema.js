import mongoose from "mongoose";
const productSchema=mongoose.Schema({
    productName:{
        type:String,
        required:true
    },
    productPrice:{
        type:Number,
        require:true,
        min:1
    },
    productQty:{
        type:Number,
        required:true,
        min:1
    },
    categoryName:{
        type:String
    },
    productImage:{
        type:String
    },
    productDescription:{
        type:String
    }
})
const Product=mongoose.model('product',productSchema);
export default Product