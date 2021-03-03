const router = require("express").Router();

const categories = require('../models/adminCategories');


router.get('/',(req,res)=>{
    res.send('cate')
})












module.exports = router;