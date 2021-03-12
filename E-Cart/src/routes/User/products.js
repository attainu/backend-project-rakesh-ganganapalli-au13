const router = require('express').Router();
const userProductsController = require('../../controllers/User/userProductsController');
const isLogin = require('../../middlewere/isLoggedin')



/*Method : Get 
get all products*/
router.get('/Allproducts',isLogin,userProductsController.getAllProducts);




/*Method : Get 
product products by category*/
router.get('/:category/products',isLogin,userProductsController.getProduct)



/*Method : Get 
get product details*/
router.get('/:category/:product',isLogin,userProductsController.getProductDetails)



module.exports = router;