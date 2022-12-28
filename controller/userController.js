import Cart from "../model/cartSchema.js"
import Product from "../model/productScema.js"
import User from "../model/userShema.js"
import bcrypt from 'bcryptjs'
import Category from "../model/categorySchema.js"
import { Order } from "../model/orderSchema.js"
export const userWelcome=(req,res)=>{
    return res.render('user/welcomePage.ejs')
}
export const userLoginShow=(req,res,next)=>{
    return res.render('user/login.ejs',{
        failure:req.flash('failure'),
        currentUser:req.session,
        categoryList:[]
    })
}
export const userLogin=async (req,res,next)=>{
    try {
        const data =await User.findOne({email:req.body.email})
        if(data){
                let pass=data.password
                let isPassCorrect=await bcrypt.compare(req.body.password,pass)
                if(isPassCorrect){
                    req.session.email=data.email
                    return res.redirect('/main')
                }
                else{
                    req.flash('failure','Wrong Credentials...')
                return res.redirect('/login')
                
                }
        }
        else{
            req.flash('failure','Wrong Credentials...')
            return res.redirect('/login')
        }
       
    } catch (error) {
        
    }
}
export const userRegisterShow=(req,res,next)=>{
    return res.render('user/register.ejs')
}
export const userRegister=async (req,res,next)=>{
    try {
        const user=await User.find({email:req.body.email})
        if(!user){
            let salt=await bcrypt.genSalt(10);
            let encPass=await bcrypt.hash(req.body.password,salt)
            req.body.password=encPass
            await User.create(req.body)
            res.redirect('/main')
        }
        else{
            req.flash('failure','Email Already Exist..')
            res.redirect('/');
        }
    } catch (error) {
        
    }
}

export const mainPage=async (req,res)=>{
   try {
    const data=await Product.find();
    const cart=await Cart.find();
    const category=await Category.find();
    res.render('user/mainPage.ejs',{
        products:data,
        cart:cart,
        categoryList:category,
        currentUser:req.session,
        success:req.flash('success'),
        failure:req.flash('failure'),
    })
   } catch (error) {
        console.log(error);
   }
}

export const showProducts=async(req,res,next)=>{
    try {
        const catName=req.params.categoryName;
        const data=await Product.find({categoryName:catName});
        return res.status(200).json(data)
    } catch (error) {
        console.log(error);
    }
}

export const logout=(req,res,next)=>{
    req.session.email=null;
    req.session.destroy();
    return res.redirect('/')
}


export const myOrder=async (req,res,next)=>{
    try {
        const data=await Order.find({email:req.session.email})
        return res.json(data)
    } catch (error) {
        console.log(error);
    }
}

export const orderedItems=async (req,res,next)=>{
    try {
        const data = await Order.findOne({_id:req.params.id})
       return res.json({item:data.items})
    } catch (error) {
        console.log(error);
    }
}