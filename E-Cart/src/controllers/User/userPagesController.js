const pages  = require('../../models/adminPages');



const userPages = {

    gethomePage(req,res){
        res.redirect('/api/user/Allproducts')
    },


    async getPages(req,res){
        
        let slug = req.params.slug;
        await pages.find({slug:slug},(err,page)=>{
    
            if(err) return console.log(err)
    
            if(!page.length){ 
                return res.redirect('/api/user') 
            }else{
                let data = {
                    email :req.session.user.email,
                    title : page[0].title,
                    contant : page[0].contant
                }
                res.render('user/homepage',data)
    
            }
    
        })
    
    }








}


module.exports = userPages;