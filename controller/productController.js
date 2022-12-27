import Category from '../model/categorySchema.js'
import Product from '../model/productScema.js'
export const productshowForm=async (req,res,next)=>{
 try {
    const data=await Category.find();
    res.render('admin/product/addProduct.ejs',{
        category:data,
        success:req.flash('success'),
        failure:req.flash('failure'),
       })
 } catch (error) {
    console.log(error);
 }
}
export const productadd=async (req,res,next)=>{
    try {
        req.body.productImage=req.file.filename
        await Product.create(req.body)
        req.flash('success','Product Inserted')
       return res.redirect('/admin/product/add')
       } catch (error) {
            console.log(error);
            req.flash('Failure','Oops!... something went wrong')
          return  res.redirect('/admin/product/add')
       }
}
export const productlist=async (req,res,next)=>{
    try {
        const data =await Product.find().sort({_id:-1})
    return res.render('admin/product/productList',{
        product:data,
        success:req.flash('success'),
        failure:req.flash('failure'),
    })
    } catch (error) {
        console.log(error);
    }
}

export const producteditshow=async (req,res,next)=>{
    try {
        const product=await Product.find({_id:req.params.id})
        const category =await Category.find({categoryName:{$ne:product[0].categoryName}})
        return res.render('admin//product/editProduct',{
            product,
            category
        })
    } catch (error) {
        console.log(error);
    }
}
export const productedit=async (req,res,next)=>{
    try {
        const id=req.body._id;
        delete req.body._id
        await Product.updateOne({_id:id},{$set:req.body})
        req.flash('success','Product edited successfully')
       return res.redirect('/admin/product/list')
    } catch (error) {
        console.log(error);
        req.flash('failure','Oops!... something went wrong')
        return res.redirect('/admin/product/list')
    }
}
export const productremove=async (req,res,next)=>{
    try {
        await Product.deleteOne({_id:req.params.id})
        req.flash('success','Product deleted successfully')
       return res.redirect('/admin/product/list')
    } catch (error) {
        console.log(error);
        req.flash('failure','Oops!... something went wrong')
        return res.redirect('/admin/product/list')
    }
}