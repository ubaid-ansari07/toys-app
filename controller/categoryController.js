import Category from "../model/categorySchema.js"
export const categoryshowForm=(req,res,next)=>{
    res.render('admin/category/addCategory',{
        success:req.flash('success'),
        failure:req.flash('failure'),
    })
}
export const categoryadd=async (req,res,next)=>{
   try {
    const data=await Category.create(req.body)
    req.flash('success','Category Inserted')
   return res.redirect('/admin/category/add')
   } catch (error) {
        console.log(error);
        req.flash('Failure','Oops!... something went wrong')
      return  res.redirect('/admin/category/add')
   }
}
export const categorylist=async (req,res,next)=>{
    try {
        const data =await Category.find().sort({_id:-1})
    return res.render('admin/category/categoryList',{
        category:data,
        success:req.flash('success'),
        failure:req.flash('failure'),
    })
    } catch (error) {
        console.log(error);
    }
}

export const categoryeditshow=async (req,res,next)=>{
    try {
        const data =await Category.find({_id:req.params.id})
        return res.render('admin/category/editCategory',{
            category:data,
        })
    } catch (error) {
        console.log(error);
    }
}
export const categoryedit=async (req,res,next)=>{
    try {
        await Category.updateOne({_id:req.body._id},{$set:{categoryName:req.body.categoryName}})
        req.flash('success','Category edited successfully')
       return res.redirect('/admin/category/list')
    } catch (error) {
        console.log(error);
        req.flash('failure','Oops!... something went wrong')
        return res.redirect('/admin/category/list')
    }
}
export const categoryremove=async (req,res,next)=>{
    try {
        await Category.deleteOne({_id:req.params.id})
        req.flash('success','Category deleted successfully')
       return res.redirect('/admin/category/list')
    } catch (error) {
        console.log(error);
        req.flash('failure','Oops!... something went wrong')
        return res.redirect('/admin/category/list')
    }
}