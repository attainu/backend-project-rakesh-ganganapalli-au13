const router = require('express').Router();

const pages = require('../models/adminPages');

const { checkBody, validationResult } = require("express-validator");



//displaying the all pages
router.get('/',(req,res)=>{

    let Allpages = pages.find({});
    res.render('admin/pages/pages',{Allpages});
})

/*Method : Get
adding a page */
router.get('/add-page',(req,res)=>{

    res.render('admin/pages/add-page')
})

/*Method : Post
adding a page*/

router.post('/add-page',(req,res)=>{

    req.checkBody('title','plese add title').notEmpty()
    req.checkBody('contant','plese enter the contant').notEmpty()

    const error = req.validationErrors()

    console.log(error)

})
















module.exports = router;