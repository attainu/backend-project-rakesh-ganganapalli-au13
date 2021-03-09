const express    = require("express");
const path             = require('path');
require("dotenv").config({path : path.join(__dirname,'.env')});
const app = express();
const expressValidator = require('express-validator');
const DBconnection        =  require("./config/db");
const session          = require("express-session");

const port   =  process.env.PORT || 4000



//database connection
DBconnection();


//bodyparser/express-parser setup
app.use(express.json());
app.use(express.urlencoded({extended:true}));




//express validator middlewere
app.use(expressValidator());


//static file setup
app.use(express.static(path.join(__dirname, "public")));


//view engine setup
app.set('views',path.join(__dirname,'views'));
app.set('view engine','ejs');



//express-validator setup for checking image file
app.use(expressValidator({
    customValidators: {
        isImage: function(value, filename) {
    
            var extension = (path.extname(filename)).toLowerCase();
            switch (extension) {
                case '.jpg':
                    return '.jpg';
                case '.jpeg':
                    return '.jpeg';
                case  '.png':
                    return '.png';
                default:
                    return false;
            }
        }
    }}));



//express-sessions Middle were 
app.use(session({
    secret:"keyboard cat",
    resave : false,
    saveUninitialized : true,
    cookie :{secure:false}
}));




//importing thr routes
const  adminPages      = require('./routes/Admin/adminPages');
const  adminCategories = require('./routes/Admin/adminCategories');
const  adminProducts   = require('./routes/Admin/adminProducts');

//user side
const  userHome         = require('./routes/userSide/pages')
const  userProducts   = require('./routes/userSide/products')

//routes middleweres
app.use('/api/admin/pages',adminPages);
app.use('/api/admin/categories',adminCategories);
app.use('/api/admin/products',adminProducts);

app.use('/api',userHome);
app.use('/api/user',userProducts);






//get page model for display pages in userend
const pages = require('./models/adminPages')

//set all pages in header on userend
const page = async()=>{ await pages.find({},(err,page)=>{
    if(err) return console.log(err);

    app.locals.pages = page;
})}

page()


//get category model for shows categories on userend
const categories = require('./models/adminCategories')

//set all categories in header on userend
const category = async()=>{await categories.find({},(err,cat)=>{
    if(err) return console.log(err);

    app.locals.categories = cat;

})}

category()






//port setup
app.listen(port,()=>{
    console.log(`server starting at ${port}`);
});



