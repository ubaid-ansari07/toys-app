import mongoose from "mongoose";
const userSchema=mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    age:{
        type:Number,
        require:true,
        min:1
    },
    address:{
        type:String,
        required:true,
        min:1
    },
    email:{
        type:String,
        required:true
    },
    password:{
        type:String,
        required:true
    }
})
const User=mongoose.model('user',userSchema);
export default User