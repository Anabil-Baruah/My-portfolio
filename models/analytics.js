const mongoose = require('mongoose')

const userSchema = mongoose.Schema({
    
    time:{type:String, default:Date.now}
})

module.exports = mongoose.model('Blogs', userSchema)