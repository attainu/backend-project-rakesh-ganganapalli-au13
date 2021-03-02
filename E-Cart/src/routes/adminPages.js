const router = require('express').Router();

// const pages = require('../models/adminPages')



router.get('/',(req,res)=>{
    res.render('admin/pages')
})


module.exports = router;