const router     = require("express").Router();

const adminCategoriesController = require('../../controllers/Admin/adminCategories');

const isLogin = require('../../middlewere/isAdmin')



/*Method : Get 
  getting all categories*/ 
router.get('/',isLogin,adminCategoriesController.getAllCategories);


/*Method : Get 
  getting add categories*/ 
router.get('/add-category',isLogin,adminCategoriesController.getAddCategory);



/*Method : Post
adding a page*/
router.post('/add-category',isLogin,adminCategoriesController.postAddCategory);




/*Method : Get 
  getting edit categories*/ 
  router.get('/edit-category/:slug',isLogin,adminCategoriesController.getEditCategory);



/*Method : Get 
  getting edit categories*/ 
  router.post('/edit-category/:slug',isLogin,adminCategoriesController.postEditCategory);




/*Method : Get 
  delete categories*/ 
router.get('/delete-category/:id',isLogin,adminCategoriesController.getDeleteCategory);







module.exports = router;