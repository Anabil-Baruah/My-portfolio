const router = require('express').Router()
const auth = require('../auth')

router.route('/')
    .get( async(req,res)=>{
        res.render('admin')
    })

module.exports = router