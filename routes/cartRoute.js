import express from 'express'
import { isUserLogin } from '../authentication/auth.js';
import { cart, cartDel, cartShow, qtyDec, qtyInc, placeOrder } from '../controller/cartController.js';
const router=express.Router();

router.get('/:id',isUserLogin,cart)
router.get('/',isUserLogin,cartShow)
router.get('/qty/inc/:index',qtyInc)
router.get('/qty/dec/:index',qtyDec)
router.get('/del/:index',cartDel)
router.post('/placeorder/:id',placeOrder)
export default router;