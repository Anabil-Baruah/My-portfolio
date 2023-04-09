const router = require('express').Router()
const { auth, baseURL } = require('../auth')
const service = require('../models/services')
const blog = require('../models/Blogs')
const work = require('../models/work')
const adminInfo = require('../models/adminInfo')
const jwt = require('jsonwebtoken')
const cloudinary = require('../cloudinary')

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

router.route('/auth')
    .get(async (req, res) => {
        res.render('authentication')
    })
    .post(async (req, res) => {
        var username = req.body.username;
        var password = req.body.password;


        const userFound = await adminInfo.findOne({ email })


        if (userFound == null) {
            return res.json({
                status: "error",
                message: "User does ont exist"
            });
        } else {
            const passMatch = await bcrypt.compare(password, userFound.password)

            if (passMatch) {
                var accessToken = jwt.sign({ username: username }, process.env.ACCESS_TOKEN_SECRET);

                // await user.findOneAndUpdate({ email }, {
                //     $set: {
                //         accessToken
                //     }
                // }, (err, data) => {
                //     if (!err) {
                //         res.cookie('jwt', accessToken)
                //         res.redirect('/')
                //     } else {
                //         res.redirect('/login')
                //     }
                // })
                res.cookie('jwt', accessToken, {
                    httpOnly: true
                })
                const result = await adminInfo.findOneAndUpdate({ username }, {
                    $set: {
                        accessToken
                    }
                })
                console.log(result)
                if (result !== null) {
                    res.redirect(`${baseURL}/admin`)
                } else {
                    res.json({
                        status: "error",
                        message: "Invalid credentials"
                    });
                }
            } else {
                res.json({
                    "status": "error",
                    "message": "Invalid credentials"
                })
            }
        }
    })

router.route('/editProject')
    .post(async (req, res) => {
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
        } else {
            res.json({
                status: "error",
                message: "Some error occured"
            })
        }

    })

router.route('/addWork')
    .post(async (req, res) => {

        cloudinary.uploader.upload(`data:${req.body.fileType};base64,${req.body.base64String}`, {
            resource_type: 'raw',
            folder: 'images',
            width: 1000,
            height: 600,
            public_id: req.body.public_file_Id
            // crop: "scale"
        }).then(async (result) => {
            console.log(result)
            const newWork = new work({
                Description: req.body.desc,
                imgURL: result.url,
                LiveDemo: req.body.liveLink,
                Heading: req.body.title,
                ReadMore: req.body.readMore,
                imgPublicId: result.public_id
            })
            const WorkSave = await newWork.save()
            console.log(newWork)
            console.log(WorkSave)

            if (WorkSave)
                res.json({ status: "success", message: "Work uploaded succesfully" })
            else
                res.json({ status: "error", message: "Some error occured try later" })

        }).catch(() => {
            console.log("error occured")
        })
    })

router.route('/addBlog')
    .post(async (req, res) => {
        const newBlog = new blog({
            Heading: req.body.blogTitle,
            img: req.body.imgURL,
            blogLink: req.body.blogLink,
        })
        const BlogSave = await newBlog.save()

        if (BlogSave)
            res.json({ status: "success", message: "Blog uploaded succesfully" })
        else
            res.json({ status: "error", message:"Some error occured" })
    })


router.route('/editBlog')
    .post(async (req, res) => {
        console.log(req.body)
        const blogUpdated = await blog.updateOne({ "_id": req.body._id }, {
            $set: {
                blogLink: req.body.blogLink,
                img: req.body.imgURL,
                Heading: req.body.heading
            }
        })
        if (blogUpdated.modifiedCount == 0)
            return res.json({
                status: "error",
                message: "No modification has been made"
            })
        if (blogUpdated) {
            res.json({
                status: "success",
                message: "Blog updated"
            })
        } else {
            res.json({
                status: "error",
                message: "Sorry some error occured"
            })
        }
    })

module.exports = router
