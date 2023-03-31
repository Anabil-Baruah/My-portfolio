const mongoose = require('mongoose')

const userSchema = mongoose.Schema({
    username: String,
    email: String,
    subject: String,
    message: String
})

module.exports = mongoose.model('request', userSchema)