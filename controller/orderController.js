import { Order } from "../model/orderSchema.js"

export const allOrders=async (req,res,next)=>{
    try {
        const data =await Order.find().sort({_id:-1});
       return res.render('admin/orders.ejs',{data})
    } catch (error) {
        console.log(error);
    }
}
export const fullDetails=async (req,res,next)=>{
    try {
        const data =await Order.findOne({_id:req.params.id})
        return res.render('admin/fullDetails.ejs',{data})
    } catch (error) {
        console.log(error);
    }
}
export const updateStatusD=async (req,res,next)=>{
    try {
        await Order.updateOne({_id:req.params.id},{$set:{status:'delivered'}})
        return res.json({mess:'Order Sent',status:"delivered"})
    } catch (error) {
        console.log(error);
    }
}

export const updateStatusC=async (req,res,next)=>{
    try {
        await Order.updateOne({_id:req.params.id},{$set:{status:'canceled'}})
        return res.json({mess:'Order Sent',status:"canceled"})
    } catch (error) {
        console.log(error);
    }
}