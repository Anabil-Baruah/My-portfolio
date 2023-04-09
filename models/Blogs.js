const mongoose = require('mongoose')

const userSchema = mongoose.Schema({
    blogLink: String,
    img: String,
    Heading: String,
    time:{type:String, default:Date.now}
})

module.exports = mongoose.model('Blogs', userSchema)