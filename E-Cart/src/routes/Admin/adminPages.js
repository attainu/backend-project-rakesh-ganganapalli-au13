const router = require('express').Router();

const AdminPagesControllers = require('../../controllers/Admin/adminPages')

const isLogin = require('../../middlewere/isAdmin')



/*Method : Get
  Displaying all AdminPages*/
router.get('/',isLogin,AdminPagesControllers.getAllPages)


/*Method : Get
adding a page */
router.get('/add-page',isLogin,AdminPagesControllers.getAddPage)



/*Method : Post
adding a page*/
router.post('/add-page',isLogin,AdminPagesControllers.postAddPage)



/*Method : Get
edit a page*/
router.get('/edit-page/:slug',isLogin,AdminPagesControllers.getEditPage)



/* Method : Post
Edit(update) page*/
router.post('/edit-page/:slug',isLogin,AdminPagesControllers.postEditPage)



/* Method : Post
delete page*/
router.get('/delete-page/:id',isLogin,AdminPagesControllers.getDeletePage)














module.exports = router;