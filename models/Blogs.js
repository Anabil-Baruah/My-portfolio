const mongoose = require('mongoose')

const userSchema = mongoose.Schema({
    linkURL: String,
    img: String,
    Description: String,
    time:{type:String, default:Date.now}
})

module.exports = mongoose.model('Blogs', userSchema)