export const isUserLogin=(req,res,next)=>{
   if(req.session.userid){
        return next();
   }
   else{
    return res.redirect('/login')
   }
}
export const isUserLogout=(req,res,next)=>{
    if(!req.session.userid){
        return next();
    }
    else{
        return res.redirect('/main')
    }
}