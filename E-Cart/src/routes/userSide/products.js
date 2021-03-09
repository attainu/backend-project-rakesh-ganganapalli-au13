const router = require('express').Router();
const product = require('../../models/adminProducts');


/*Method : Get 
get all products*/

router.get('/Allproducts',async(req,res)=>{
        await product.find({},(err,pro)=>{
            if(err) return console.log(err);
    
            let data = {
                title : "All products",
                products : pro
            }
            res.render('user/products',data)
        })
        
    });




/*Method : Get 
product*/
router.get('/Allproducts',async(req,res)=>{
    await product.find({},(err,pro)=>{
        if(err) return console.log(err);

        let data = {
            title : "All products",
            products : pro
        }
        res.render('user/products',data)
    })
    
});






module.exports = router;