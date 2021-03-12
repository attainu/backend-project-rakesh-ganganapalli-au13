const router = require("express").Router();

const cartController = require('../../controllers/User/cartController');
const isLogin = require('../../middlewere/isLoggedin')


/*Method : Get,
add product to cart*/
router.get('/add/:product',isLogin,cartController.addProductCart);




/*Method : Get,
get cart page*/
router.get('/checkout',isLogin,cartController.getCartPage);




/* Method : GET
get update product cart*/

router.get("/update/:product",isLogin,cartController.getUpdateCartItems);



/* Method : GET
get update product cart*/
router.get("/clear",isLogin,cartController.getClearCart);



module.exports  = router;