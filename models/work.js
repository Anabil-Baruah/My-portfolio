const mongoose = require('mongoose')

const userSchema = mongoose.Schema({
    Description:String,
    img:String,
    linkURL:String,
    imgPublicId:String,
    Heading:String
})

module.exports = mongoose.model('Work', userSchema)