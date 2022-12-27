import  express  from "express";
import {categoryadd, categoryedit, categoryeditshow, categorylist, categoryremove, categoryshowForm} from "../controller/categoryController.js";
import {productadd, productedit, producteditshow, productlist, productremove, productshowForm} from "../controller/productController.js";
import multer from "multer";
const upload=multer({dest:'public/productImages'})
const router=express.Router();


router.get('/',productlist)
//category
router.route('/category/add')
.get(categoryshowForm)
.post(categoryadd)

router.get('/category/list',categorylist)

router.get('/category/edit/:id',categoryeditshow)
router.post("/category/edit",categoryedit)

router.get('/category/delete/:id',categoryremove)


//product
router.route('/product/add')
.get(productshowForm)
.post(upload.single('productImage'),productadd)

router.get('/product/list',productlist)

router.get('/product/edit/:id',producteditshow)
router.post("/product/edit",productedit)

router.get('/product/delete/:id',productremove)
export default router