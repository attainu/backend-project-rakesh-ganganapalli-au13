const router = require("express").Router();
const products  = require('../../models/adminProducts')

/*Method : Get,
get cart*/
router.get('/add/:product',async(req,res)=>{

    let slug = req.params.product;

    await products.findOne({slug:slug},(e,p)=>{

         // console.log(req.session.cart)
        if(typeof req.session.cart == 'undefined'){
            req.session.cart = [],
            req.session.cart.push({
                title : slug,
                qty : 1,
                price : parseFloat(p.price).toFixed(2),
                image : p.img_url
            })
            
        } else{

            let cart = req.session.cart;
            let newitem = true;

                for(let i=0;i<cart.length;i++){
                    if(cart[i].title==slug){
                        cart[i].qty++;
                        newitem = false;
                        break;
                    }
                }

                if(newitem){

                    cart.push({
                        title : slug,
                        qty : 1,
                        price : parseFloat(p.price).toFixed(2),
                        image : '/product_images/'+p.id+'/'+p.image
        
                    })

                }
        }
        console.log(req.session.cart)
        res.redirect('back')

    })

})







module.exports  = router;