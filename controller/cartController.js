import Cart from "../model/cartSchema.js"
import { Order } from "../model/orderSchema.js"
import Product from "../model/productScema.js"
import User from "../model/userShema.js"

export const cart=async (req,res)=>{
    try {
        const product=await Product.findOne({_id:req.params.id})
        const user=await User.findOne({email:req.session.email})
        const cart=await Cart.findOne({email:req.session.email})
        if(!user){
            req.flash('success','Added in cart')
            return res.redirect('/main')
        }
        else{
            if(!cart){
                await Cart.create({
                    name:user.name,
                    email:req.session.email,
                    productList:[{
                            productId:product._id,
                            productName:product.productName,
                            productPrice:product.productPrice,
                            productImage:product.productImage,
                            productQty:1
                    }]
                })
                req.flash('success','Added in cart')
                return res.redirect('/main')
            }   
            else{
                let obj={
                    productId:product._id,
                    productName:product.productName,
                    productPrice:product.productPrice,
                    productImage:product.productImage,
                    productQty:1
                }
                cart.productList.push(obj);
                Cart.create(cart)
                req.flash('success','Added in cart')
                return res.redirect('/main')
            }
        }
    } catch (error) {
        console.log(error);        
    }
}
export const cartShow=async (req,res,next)=>{
    try {
        const data =await Cart.findOne({email:req.session.email})
        const user=await User.findOne({email:req.session.email})
        res.render('user/cart.ejs',{
            products:data,
            user:user
        })
    } catch (error) {
        
    }
}
export const qtyInc=async (req,res,next)=>{
    try {
        const index=req.params.index;
        const data =await Cart.findOne({email:req.session.email});
        let qty=data.productList[index].productQty;
        data.productList[index].productPrice=data.productList[index].productPrice*1+(data.productList[index].productPrice/qty);
        data.productList[index].productQty++;
        await Cart.updateOne({email:req.session.email},{$set:data})
        const newdata =await Cart.findOne({email:req.session.email});
        return res.json({qty:newdata.productList[index].productQty,price:newdata.productList[index].productPrice})
    } catch (error) {
        console.log(error);
    }
}
export const qtyDec=async (req,res,next)=>{
    try {
        const index=req.params.index;
        const data =await Cart.findOne({email:req.session.email});
        let qty=data.productList[index].productQty;
        if(qty>1){
        data.productList[index].productPrice=data.productList[index].productPrice*1-(data.productList[index].productPrice/qty);
        data.productList[index].productQty--;
        }
        await Cart.updateOne({email:req.session.email},{$set:data})
        const newdata =await Cart.findOne({email:req.session.email});
        return res.json({qty:newdata.productList[index].productQty,price:newdata.productList[index].productPrice})
    } catch (error) {
        console.log(error);
    }
}
export const cartDel=async (req,res,next)=>{
    try {
        const cart=await Cart.findOne({email:req.session.email})  
        cart.productList.splice(req.params.index,1)
        await Cart.create(cart)
        return res.redirect('/cart')
    } catch (error) {
        console.log(error);
    }
}

export const placeOrder=async (req,res,next)=>{
   try {
        const cartId=req.body.id;
        const cartData=await Cart.findOne({_id:cartId});
        const user=await User.findOne({email:req.session.email})
        let obj=[]
        let total=0;
        for(let i=0;i<cartData.productList.length;i++){
            obj.push(cartData.productList[i])
            total+=cartData.productList[i].productPrice;
        }
        await Order.create({
            name:user.name,
            email:user.email,
            total:total,
            date:Date.now(),
            status:"pending",
            deliveryAddress:req.body.deliveryAddress,
            items:obj
        })
        await Cart.deleteOne({_id:cartId});
        return res.status(300).json({mess:"Order Placed Successfuly"})
   } catch (error) {
    return res.status(300).json({mess:"Oops! Something went wrong"})
   }
}