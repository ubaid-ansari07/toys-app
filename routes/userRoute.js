import express  from "express";
import {  cart, mainPage, userLogin, userLoginShow, userRegister, userRegisterShow, userWelcome ,cartShow, qtyDec, qtyInc,cartDel} from "../controller/userController.js";
import {isUserLogin ,isUserLogout} from '../authentication/auth.js'
const router=express.Router();

router.get('/',userWelcome)
router.route('/login').get(isUserLogout,userLoginShow).post(userLogin    )
router.route('/register').get(isUserLogout,userRegisterShow).post(userRegister)
router.get('/main',isUserLogin,mainPage)
router.get('/cart/:id',isUserLogin,cart)
router.get('/cart',isUserLogin,cartShow)
router.get('/cart/qty/inc/:id',qtyInc)
router.get('/cart/qty/dec/:id',qtyDec)
router.get('/cart/del/:id',cartDel)
export default router 