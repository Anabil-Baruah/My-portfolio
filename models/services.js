const mongoose = require('mongoose')

const userSchema = mongoose.Schema({
Content:String,
imgURL:String,
imgPublicId:String
})

module.exports = mongoose.model('Services', userSchema)