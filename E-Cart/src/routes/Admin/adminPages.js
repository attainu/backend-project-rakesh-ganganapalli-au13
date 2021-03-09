const router = require('express').Router();

const pages = require('../../models/adminPages');







/*Method : Get
  Displaying all AdminPages*/
router.get('/',async(req,res)=>{

     let Allpages = await pages.find({});
    // console.log(Allpages)
    const data ={ 
        Allpages : Allpages,
        error    : ''
    }
    res.render('admin/pages/pages',data);
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

router.post('/add-page',async(req,res)=>{

    req.checkBody('title','please enter title').notEmpty()
    req.checkBody('contant','please enter contant').notEmpty()
    
    let title    = req.body.title;

    let slug     = req.body.slug.replace(/\s+/g,'-').toLowerCase();
    if(slug=='') slug = title.replace(/\s+/g,'-').toLowerCase();
    let contant  = req.body.contant

    const errors = req.validationErrors()
    // console.log(req.body)

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

await pages.findOne({slug : slug},(err,page)=>{

    if(page){
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

            //for fentend auto update pages when reload without server
            pages.find({},(err,page)=>{
                if(err) return console.log(err);
            
                req.app.locals.pages = page;
            })

            res.redirect('/api/admin/pages')
        })
    }
})




}

})






/*Method : Get
edit a page*/

router.get('/edit-page/:slug',async(req,res)=>{

    await pages.findOne({slug:req.params.slug},(err,page)=>{
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







/* Method : Post
Edit(update) page*/

router.post('/edit-page/:slug',async(req,res)=>{

    req.checkBody('title','please enter title').notEmpty(),
    req.checkBody('contant','please enter contant').notEmpty()

        let title = req.body.title;
        let slug = req.body.slug.replace(/\s+/g,'-').toLowerCase();
        if(slug=='') slug = title.replace(/\s+/g,'-').toLowerCase();
        let contant = req.body.contant
        let id      = req.body.id

        const errors = req.validationErrors()
    // console.log(errors)

    if(errors.length){

        const data = {
            id       : id,
            title    : title,
            slug     : slug,
            contant  : contant,
            error    : errors
        }
        // console.log(data.error)
        return res.render('admin/pages/edit-page',data)
    }else{

    await pages.findOne({slug : slug, _id :{$ne : id}},(err,page)=>{

        if(page){
            const data = {
                id       : id,
                title    : title,
                slug     : slug,
                contant  : contant,
                error    : [{msg:'page already exist'}]
            }

            return res.render('admin/pages/edit-page',data)
            
        }else{

        pages.findById(id,(err,page)=>{

            if(err) return console.log(err)

            page.title    = title
            page.slug     = slug
            page.contant  = contant
        
            page.save((err)=>{
                    if(err) return console.log(err)

                    //for fentend auto update pages when reload without server
                    pages.find({},(err,page)=>{
                        if(err) return console.log(err);
                    
                        req.app.locals.pages = page;
                    })
                    
                    res.redirect('/api/admin/pages')
                })
        })
    }




    })

}

})





/* Method : Post
delete page*/

router.get('/delete-page/:id',async(req,res)=>{

    await pages.findByIdAndDelete({_id : req.params.id}, (err)=>{

        if(err) return console.log(err)

        //for fentend auto update pages when reload without server
        pages.find({},(err,page)=>{
            if(err) return console.log(err);
        
            req.app.locals.pages = page;
        })

        res.redirect( '/api/admin/pages')

    })

    
})














module.exports = router;