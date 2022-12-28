import express  from "express";
import { mainPage, userLogin, userLoginShow, userRegister, showProducts,logout} from "../controller/userController.js";
import {isUserLogin ,isUserLogout} from '../authentication/auth.js'
const router=express.Router();

router.get('/',isUserLogout,userLoginShow)
router.post('/login',userLogin)
router.post('/register',userRegister)
router.get('/main',isUserLogin,mainPage)
router.get('/main/product/:categoryName',showProducts)
router.post('/logout',logout)
export default router;