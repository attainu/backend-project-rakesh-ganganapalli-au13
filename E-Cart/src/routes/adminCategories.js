const router = require("express").Router();

const categories = require('../models/adminCategories');

/*Method : Post 
  getting all categories*/ 
router.get('/', async (req,res)=>{

    let Allcategories = await categories.find({});
    const data = {
        Allcategories : Allcategories,
        error         : ''
    }
    res.render('admin/categories/categories',data)
});


/*Method : Get 
  getting add categories*/ 
router.get('/add-category',(req,res)=>{

    const data = {
        title : '',
        slug  : '',
        error : ''
    }
    res.render('admin/categories/add-category',data)
});




/*Method : Post
adding a page*/

router.post('/add-category',async(req,res)=>{

    req.checkBody('title','please enter title').notEmpty()
    

    let title    = req.body.title;

    let slug     = req.body.slug.replace(/\s+/g,'-').toLowerCase();
    if(slug=='') slug = title.replace(/\s+/g,'-').toLowerCase();
    // console.log(slug)


    const errors = req.validationErrors()
    // console.log(errors)

if(errors.length){

    const data = {

        title    : title,
        slug     : slug,
        error    : errors
    }
    // console.log(data.error)
    return res.render('admin/categories/add-category',data)
}else{

await categories.findOne({slug : slug},(err,category)=>{

    if(category){
        // req.flash('danger','page already exists')
        const data = {

            title    : title,
            slug     : slug,
            error    : [{msg:'category already exist'}]
        }
        return res.render('admin/categories/add-category',data)
        
    }else{
        const category = new categories({
            title    : title,
            slug     : slug
        })
        category.save(async(err)=>{

            if(err) return console.log(err);

            //for update the categories on user end
            await categories.find({},(err,cat)=>{
                if(err) return console.log(err);
                req.app.locals.categories = cat;
                });

            res.redirect('/api/admin/categories');
        })
    }
});




}

});




/*Method : Get 
  getting edit categories*/ 
  router.get('/edit-category/:slug',async (req,res)=>{
    //   console.log(req.url)

    await categories.find({slug:req.params.slug},(err,cat)=>{
        // console.log(cat[0].title)
        if(err) return console.log(err)
        const data = {
            id    : cat[0]._id,
            title : cat[0].title,
            slug  : cat[0].slug,
            error : ''
        }
        res.render('admin/categories/edit-category',data)


    })



   
});



/*Method : Get 
  getting edit categories*/ 

  router.post('/edit-category/:slug',async(req,res)=>{

        req.checkBody('title','plese enter category name');

        let title = req.body.title;
        let slug  = req.body.slug.replace(/\s+/g,'-').toLowerCase();
        if (slug=='') slug = title.replace(/\s+/g,'-').toLowerCase();
        let id     = req.body.id

        // console.log(id)

        let errors = req.validationErrors();

        if(errors.length){
            let data = {
                title : title,
                slug  : slug,
                error : errors
            }
            res.render('admin/categories/edit-category',data)
        }else{

           await categories.findOne({slug:slug, _id : {$ne : id}},async(err,cat)=>{

                if(err) return console.log(err)

                if(cat){
                    const data = {
                        id       : id,
                        title    : title,
                        slug     : slug,
                        error    : [{msg:'category already exist'}]
                    }
        
                    return res.render('admin/categories/edit-category',data)
                    
                }else{


                    await categories.findById(id,(err,category)=>{

                        if(err) return console.log(err)
        
                        category.title    = title
                        category.slug     = slug
                
                        category.save(async(err)=>{
                        if(err) return console.log(err)

                         //for update the categories on user end
                        await categories.find({},(err,cat)=>{
                            if(err) return console.log(err);
                            req.app.locals.categories = cat;
                            });

                        res.redirect('/api/admin/categories')
                        })
                    })
                 }
            })

        } 

});




/*Method : Get 
  getting delete categories*/ 
  
  router.get('/delete-category/:id',async (req,res)=>{

    await categories.findByIdAndDelete({_id : req.params.id},async(err,cat)=>{
        
        if(err) return console.log(err)

         //for update the categories on user end
         await categories.find({},(err,cat)=>{
            if(err) return console.log(err);
            req.app.locals.categories = cat;
            });
        
        res.redirect('/api/admin/categories/')


    })



   
});







module.exports = router;