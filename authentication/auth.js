export const isUserLogin=(req,res,next)=>{
   if(req.session.email){
        return next();
   }
   else{
    return res.redirect('/')
   }
}
export const isUserLogout=(req,res,next)=>{
    if(!req.session.email){
        return next();
    }
    else{
        return res.redirect('/main')
    }
}