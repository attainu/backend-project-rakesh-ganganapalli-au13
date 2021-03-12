const router = require("express").Router();
const dotenv = require('dotenv')
const path   = require('path')

dotenv.config({path:path.join(__dirname,'../../../.env')});

const register  = require('../../controllers/userRegister/Authentication')



/*Method : Get
get signup page*/
router.get('/api/user/signup',register.getSignup);


/*Method : Post
post signup page*/
router.post('/api/user/signup',register.postSignup);


/*Method : Get
get login page*/
router.get('/',register.getLogin)


/*Method : Post
post login page*/

router.post('/',register.postLogin);




router.get('/api/user/logout',register.getLogout)

module.exports = router;