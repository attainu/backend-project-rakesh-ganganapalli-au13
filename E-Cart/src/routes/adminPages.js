const router = require('express').Router();

const pages = require('../models/adminPages')


//displaying the all pages
router.get('/',(req,res)=>{

    let Allpages = pages.find({});
    res.render('admin/pages',{Allpages});
})

//adding a page 
router.get('/add-page',(req,res)=>{
    res.render('admin/add-page')
})
















module.exports = router;