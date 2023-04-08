const mongoose = require('mongoose')

const userSchema = mongoose.Schema({
    Description:String,
    imgURL:String,
    LiveDemo:String,
    Heading:String,
    ReadMore:String,
    imgPublicId:String
})

module.exports = mongoose.model('Work', userSchema)