const router     = require("express").Router();
const multer     = require("multer");
const adminProductsController = require('../../controllers/Admin/adminProducts');
const isLogin = require('../../middlewere/isAdmin')



const upload = multer({
    storage: multer.diskStorage({})
});




/*Method : Get
get all products*/
router.get('/',isLogin,adminProductsController.getAllProducts);




/*Method : Get
add  products*/
router.get('/add-product',isLogin,adminProductsController.getAddProduct);




/*Method : post
add  products*/
router.post('/add-product',isLogin,upload.single('image'),adminProductsController.postAddProduct);


/*Method : Get
edit  products*/
router.get('/edit-product/:id',isLogin,adminProductsController.getEditProduct);



/*Method : post
edit  products*/
router.post('/edit-product/:id',isLogin,upload.single('image'),adminProductsController.postEditProduct);



/*Method : Get
delete  products*/
router.get('/delete-product/:id',isLogin,adminProductsController.getDeleteProduct);





module.exports = router;


