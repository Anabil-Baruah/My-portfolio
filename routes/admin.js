const router = require('express').Router()
const auth = require('../auth')
const service = require('../models/services')
const blog = require('../models/Blogs')
const work = require('../models/work')

router.route('/')
    .get( async(req,res)=>{
        var services = await service.find({})
        var works = await work.find({})
        var blogs = await blog.find({})
        works = JSON.parse(JSON.stringify(works))
        blogs = JSON.parse(JSON.stringify(blogs))
        services = JSON.parse(JSON.stringify(services))

        res.render('admin', {services, works, blogs})
    })

module.exports = router