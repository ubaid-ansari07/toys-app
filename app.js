import  express  from "express";
import mongoose from "mongoose";
import path from 'path'
import { dirname } from 'path';
import { fileURLToPath } from 'url';
import adminRouter from './routes/adminRoute.js'
import userRouter from './routes/userRoute.js'
import bodyParser from "body-parser";
import flash from 'connect-flash'
import session from "express-session";
import cookieParser from "cookie-parser";
const __dirname = dirname(fileURLToPath(import.meta.url));
const app=express();
app.use(session({
    secret: 'toyscdgygduygshop',
    resave: false,
    saveUninitialized: true,
    cookie: { maxAge:3600000 }
  }))
app.use(cookieParser())
app.use(flash())
app.use(express.static(path.join(__dirname,'public')))
app.set('view engine','ejs')
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}))
mongoose.set('strictQuery', true);
mongoose.connect('mongodb+srv://ubaid_mern:izzaLbqGOr1Ze5D3@cluster0.ejtuxti.mongodb.net/toysdb?retryWrites=true&w=majority',err=>{
    if(err)
        console.log(err);
    else
        {
            console.log('connected to database');
            app.use('/',userRouter)
            app.use('/admin',adminRouter)
            app.listen(8000,()=>{
                console.log("server started....");
            })
        }
})
