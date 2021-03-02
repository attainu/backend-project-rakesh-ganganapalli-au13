const express    = require("express");
const path             = require('path');
require("dotenv").config({path : path.join(__dirname,'.env')});
const app = express();


const DBconnection        =  require("./config/db");

//database connection
DBconnection();


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



