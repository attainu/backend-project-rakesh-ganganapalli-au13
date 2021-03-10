const router = require("express").Router();

const userPageController = require('../../controllers/User/userPagesController')


/*Method :Get
getting home page*/
router.get("/user",userPageController.gethomePage);




/*Method : Get 
getting pages*/
router.get("/:slug",userPageController.getPages);



module.exports = router;