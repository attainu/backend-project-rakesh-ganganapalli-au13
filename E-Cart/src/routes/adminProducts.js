const router = require("express").Router();
const multer = require("multer");
const products = require('../models/adminProducts');
const categories = require('../models/adminCategories')
const cloudinary = require('../config/cloudinary');
const path = require("path");

const upload = multer({
    storage: multer.diskStorage({})
});




/*Method : Get
get all products*/

router.get('/',async (req,res)=>{
    var count = 0 ; 
    

    await products.countDocuments((err,c)=>{
        if(err) return console.log(err)
        count = c;
    })


    await products.find((err,product)=>{
        if (err) return console.log(err);
        let data ={
            products : product,
            count    : count,
            error    : ''
        };
    
        res.render('admin/products/products',data);
    })
   

});




/*Method : Get
add  products*/

router.get('/add-product',async (req,res)=>{

    categories.find({},(err,categories)=>{

        if(err) return console.log(err)

        let data = {
            title : '',
            category : categories,
            price : '',
            discription : '',
            image : '',
            error  : ''
        }

    res.render('admin/products/add-product',data)
    })


})




/*Method : post
add  products*/


router.post('/add-product',upload.single('image'),(req,res)=>{

      //checking image file is undefined or not
    // console.log(req.file,req.body)
    if(!req.file){ imgFile =""; }

    if(req.file){
        
        var imgFile = typeof(req.file) !== "undefined" ? req.file.originalname : "";
    }



    req.checkBody('title',       'please enter title').notEmpty()
    req.checkBody('price',       'please enter the price').isDecimal()
    req.checkBody('discription', 'please enter discription').notEmpty()
    req.checkBody('category',    'please enter the category').notEmpty()
    req.checkBody('image',        'please upload valid image file').isImage(imgFile)

    let errors = req.validationErrors();
   


    let title       = req.body.title;
    let slug        = title.replace(/\s+/g,'-').toLowerCase();
    let discription = req.body.discription;
    let price       = req.body.price;
    let category    = req.body.category;



    if(errors.length){

        categories.find((err,categories)=>{
            let data = {
                title       : title,
                category    : categories,
                price       : price,
                discription : discription,
                error       : errors
            }
            
            res.render('admin/products/add-product',data)
    
        })
    }else{

        products.findOne({slug : slug},(err,product)=>{

            if(err) return console.log(err);

            if(product){
                categories.find((err,categories)=>{

                    if(err) return console.log(err);

                    const data = {

                        title        : title,
                        price        : price,
                        discription  : discription,
                        category     : categories,
                        error        : [{msg:'product title already exist'}]
                    }
                    return res.render('admin/products/add-product',data);
                })
            
            }else{
        
                let price2 =parseFloat(price).toFixed(2);
                const product = new products({
                    title         : title,
                    slug          : slug,
                    price         : price2,
                    discription   : discription,
                    category      : category,
                    image         : imgFile
                })

                product.save(async(err)=>{
                    if(err) return console.log(err);

                     await cloudinary.uploader.upload(req.file.path);

                     res.redirect('/api/admin/products')

                })
            }
    
  
        })
    }


})













module.exports = router;