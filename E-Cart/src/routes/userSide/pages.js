const router = require("express").Router();
const pages  = require('../../models/adminPages')


/*Method :Get
getting user page*/
router.get("/user",(req,res)=>{
    // let data = {
    //     title : "Home",
    //     contant : "hello users!!welcome to our website,we have great deales for you!!Happy shoping."
    // }
    // res.render('user/homepage',data)
    res.redirect('/api/user/Allproducts')
});




/*Method : Get 
getting pages*/
router.get("/:slug",async(req,res)=>{
    let slug = req.params.slug;
    await pages.find({slug:slug},(err,page)=>{

        if(err) return console.log(err)

        if(!page.length){ 
            return res.redirect('/api/user') 
        }else{
            let data = {
                title : page[0].title,
                contant : page[0].contant
            }
            res.render('user/homepage',data)

        }

    })

});



module.exports = router;