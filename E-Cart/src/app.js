const express    = require("express");
const path             = require('path');
require("dotenv").config({path : path.join(__dirname,'.env')});
const app = express();


const InitMongo        =  require("./config/db");

InitMongo();








app.listen(process.env.PORT,()=>{
    console.log(`server starting at ${process.env.PORT}`)
});
