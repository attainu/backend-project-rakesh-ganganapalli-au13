const router = require('express').Router();

const pages = require('../models/adminPages');

const { checkBody, validationResult } = require("express-validator");





//displaying the all pages
router.get('/',(req,res)=>{
    let Allpages = pages.find({});
    res.render('admin/pages/pages',{Allpages : Allpages,error : ''});
})






/*Method : Get
adding a page */
router.get('/add-page',(req,res)=>{
    let data = {
        title : '',
        slug : '',
        contant : '',
        error  : ''
    }

    res.render('admin/pages/add-page',data)
})






/*Method : Post
adding a page*/

router.post('/add-page',(req,res)=>{

    req.checkBody('title','please enter title').notEmpty()
    req.checkBody('contant','please enter contant').notEmpty()

    let title    = req.body.title;
    let slug     = req.body.slug.replace(/\s+/g,'-').toLowerCase();
    if(slug=='') slug = title.replace(/\s+/g,'-').toLowerCase();
    let contant  = req.body.contant

    const errors = req.validationErrors()
// console.log(errors)

if(errors.length){

    const data = {

        title    : title,
        slug     : slug,
        contant  : contant,
        error    : errors
    }
    // console.log(data.error)
    return res.render('admin/pages/add-page',data)
}else{

pages.findOne({slug : slug},(err,page)=>{

    if(page){
        // req.flash('danger','page already exists')
        const data = {

            title    : title,
            slug     : slug,
            contant  : contant,
            error    : [{msg:'page already exist'}]
        }
        return res.render('admin/pages/add-page',data)
        
    }else{
        const page = new pages({
            title    : title,
            slug     : slug,
            contant  : contant
        })
        page.save((err)=>{

            if(err) return console.log(err)

            res.redirect('/api/admin/pages')
        })
    }
})




}

})





/*Method : Get
edit a page*/

router.get('/edit-page/:slug',(req,res)=>{

    pages.findOne({slug:req.params.slug},(err,page)=>{
        if(err) return consolog(err);

        let data = {
            id      : page._id,
            title   : page.title,
            slug    : page.slug,
            contant : page.contant,
            error   : ''
        }
        res.render('admin/pages/edit-page',data)
    })

})



















module.exports = router;