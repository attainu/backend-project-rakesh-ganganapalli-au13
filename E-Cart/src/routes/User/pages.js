const router = require("express").Router();

const userPageController = require('../../controllers/User/userPagesController');

const auth  = require('../../middlewere/tokenValidation')


/*Method :Get
getting home page*/
router.get("/home",userPageController.gethomePage);




/*Method : Get 
getting pages*/
router.get("/api/:slug",userPageController.getPages);



module.exports = router;