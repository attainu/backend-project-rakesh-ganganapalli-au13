const router = require('express').Router();
const product = require('../../models/adminProducts');



/*Method : Get 
get all products*/

router.get('/Allproducts',async(req,res)=>{
        await product.find({},(err,pro)=>{
            if(err) return console.log(err);
    
            let data = {
                title : "All products",
                name  : 'All products',
                products : pro
            }
            res.render('user/products',data)
        })
        
    });




/*Method : Get 
product*/
router.get('/:category/products',async(req,res)=>{

    let slug = req.params.category;

   let result = await product.find({category:slug});

   let data = {
       title    : 'products',
       name     :  slug,
       products : result
   };

   res.render('user/products',data);

})



/*Method : Get 
get product details*/
router.get('/:category/:product',async(req,res)=>{

    let cat = req.params.category;
    let pro = req.params.product;

    let result = await product.find({category:cat,slug:pro});

    let data = {
       title    : 'products',
       product  : result[0]
    };

   res.render('user/productDetails',data);

})











module.exports = router;