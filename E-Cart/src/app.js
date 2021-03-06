const express    = require("express");
const path             = require('path');
require("dotenv").config({path : path.join(__dirname,'.env')});
const app = express();
const expressValidator = require('express-validator');
const DBconnection        =  require("./config/db");



//database connection
DBconnection();


//bodyparser/express-parser setup
app.use(express.json());
app.use(express.urlencoded({extended:true}));




//express validator middlewere
app.use(expressValidator());



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
















//importing thr routes
const  adminPages      = require('./routes/adminPages');
const  adminCategories = require('./routes/adminCategories');
const  adminProducts   = require('./routes/adminProducts');


//routes middleweres
app.use('/api/admin/pages',adminPages);
app.use('/api/admin/categories',adminCategories);
app.use('/api/admin/products',adminProducts);



//port setup
app.listen(process.env.PORT,()=>{
    console.log(`server starting at ${process.env.PORT}`);
});



