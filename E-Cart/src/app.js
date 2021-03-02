const express    = require("express");
const path             = require('path');
require("dotenv").config({path : path.join(__dirname,'.env')});
const app = express();
const expressValidator = require('express-validator')


const DBconnection        =  require("./config/db");

//database connection
DBconnection();


//bodyparser/express-parser setup
app.use(express.json());
app.use(express.urlencoded({extended:true}))


app.use(expressValidator())


//view engine setup
app.set('views',path.join(__dirname,'views'));
app.set('view engine','ejs');





//basic route
app.get('/',(req,res)=>{
    res.render('layouts/adminHeader');
});


const adminPages = require('./routes/adminPages');


app.use('/api/admin/pages',adminPages)



app.listen(process.env.PORT,()=>{
    console.log(`server starting at ${process.env.PORT}`);
});



