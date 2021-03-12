const router = require("express").Router();

const userPageController = require('../../controllers/User/userPagesController');

const isLogin = require('../../middlewere/isLoggedin');



/*Method :Get
getting home page*/
router.get("/home",isLogin,userPageController.gethomePage);




/*Method : Get 
getting pages*/
router.get("/api/:slug",isLogin,userPageController.getPages);



module.exports = router;