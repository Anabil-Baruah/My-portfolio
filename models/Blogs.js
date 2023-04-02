const mongoose = require('mongoose')

const userSchema = mongoose.Schema({
    username: String,
    email: String,
    subject: String,
    message: String,
    time:{type:String, default:Date.now}
})

module.exports = mongoose.model('Blogs', userSchema)