import Cart from "../model/cartSchema.js"
import Product from "../model/productScema.js"
import User from "../model/userShema.js"

export const userWelcome=(req,res)=>{
    return res.render('user/welcomePage.ejs')
}
export const userLoginShow=(req,res,next)=>{
    return res.render('user/login.ejs',{
        failure:req.flash('failure'),
    })
}
export const userLogin=async (req,res,next)=>{
    console.log('hello');
    try {
        const data =await User.find({email:req.body.email})
        req.session.userid=data[0]._id;
        if(data.length==0||data[0].password!=req.body.password){
            
            req.flash('failure','Wrong Credentials...')
            return res.redirect('/login')
        }
        else{
            console.log('hello');
            return res.redirect('/main')
        }
       
    } catch (error) {
        
    }
}
export const userRegisterShow=(req,res,next)=>{
    return res.render('user/register.ejs')
}
export const userRegister=async (req,res,next)=>{
    try {
        await User.create(req.body)
        res.redirect('/main')
    } catch (error) {
        
    }
}

export const mainPage=async (req,res)=>{
   try {
    const data=await Product.find();
    const cart=await Cart.find();
    res.render('user/mainPage.ejs',{
        products:data,
        cart:cart
    })
   } catch (error) {
        console.log(error);
   }
}

export const cart=async (req,res)=>{
    try {
        const product=await Product.findOne({_id:req.params.id})
        const user=await User.findOne({_id:req.session.userid})
        await Cart.create({
            productName:product.productName,
            productPrice:product.productPrice,
            productQty:1,
            name:user.name,
            address:user.address,
            productImage:product.productImage
        })
        return res.redirect('/main')
    } catch (error) {
        console.log(error);        
    }
}
export const cartShow=async (req,res,next)=>{
    try {
        const data =await Cart.find().sort({_id:-1})
        res.render('user/cart.ejs',{
            products:data
        })
    } catch (error) {
        
    }
}
export const qtyInc=async (req,res,next)=>{
    try {
        const data =await Cart.findOne({_id:req.params.id});
        let qty=data.qty;
        let price=data.productPrice;
        let newprice=price+(price/qty)
        qty++;
        await Cart.updateOne({_id:req.params.id},{$set:{productQty:qty,productPrice:newprice}})
        return res.redirect('/cart')
    } catch (error) {
        console.log(error);
    }
}
export const qtyDec=async (req,res,next)=>{
    try {
        const data =await Cart.findOne({_id:req.params.id});
        if(data.productQty>1){
        await Cart.updateOne({_id:req.params.id},{$set:{productQty:data.productQty-1},productPrice:data.productPrice/(data.productQty-1)}) }
    const item =await Cart.findOne({_id:req.params.id});
        return res.json({qty:item.productQty,price:item.productPrice})
    } catch (error) {
        console.log(error);
    }
}
export const cartDel=async (req,res,next)=>{
    try {
        await Cart.deleteOne({_id:req.params.id});
        return res.redirect('/cart')
    } catch (error) {
        console.log(error);
    }
}