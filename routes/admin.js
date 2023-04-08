const router = require('express').Router()

const service = require('../models/services')
const blog = require('../models/Blogs')
const work = require('../models/work')

router.route('/')
    .get(async (req, res) => {
        var services = await service.find({})
        var works = await work.find({})
        var blogs = await blog.find({})
        works = JSON.parse(JSON.stringify(works))
        blogs = JSON.parse(JSON.stringify(blogs))
        services = JSON.parse(JSON.stringify(services))
        res.render('admin', { services, blogs, works })
    })

router.route('/editProject')
    .put(async (req, res) => {
        
        const workUpdated = await work.findOneAndUpdate({ "_id": req.body._id }, {
            $set: {
                LiveDemo: req.body.liveDemo,
                Heading: req.body.heading,
                ReadMore: req.body.readMore,
                imgURL: req.body.imgURL,
                Description: req.body.description
            }
        })
        
        if (workUpdated) {
            res.json({
                status: "success",
                message: "Work updated"
            })
        }else{
            res.json({
                status: "error",
                message: "Some error occured"
            })
        }
       
    })

router.route('/addWork')
.post(async(req,res)=>{
    
})

router.route('/editBlog')
    .put(async (req, res) => {
        console.log(req.body)
        const blogUpdated = await blog.updateOne({ "_id": req.body._id }, {
            $set: {
                linkURL: req.body.blogLink,
                img: req.body.imgURL,
                Description: req.body.description
            }
        })
        if(blogUpdated.modifiedCount == 0)
            return res.json({
                status:"error",
                message:"No modification has been made"
            })
        if (blogUpdated) {
            res.json({
                status: "success",
                message: "Blog updated"
            })
        }else{
            res.json({
                status: "error",
                message: "Sorry some error occured"
            })
        }
    })


module.exports = router