const mongoose = require('mongoose')
const bcrypt = require('bcrypt')
require('dotenv').config()

const userSchema = mongoose.Schema({
  username: String,
  password: String,
  accessToken: String,
  profilePic: String,
  time: { type: String, default: Date.now }
})
userSchema.pre('save', async function (next) {
  const user = this;
  if (!user.isModified('password')) {
    return next();
  }

  try {
    const salt = await bcrypt.genSalt();
    const hashedPassword = await bcrypt.hash(user.password, salt);
    user.password = hashedPassword;
    next();
  } catch (error) {
    return next(error);
  }
});



module.exports = mongoose.model('AdminInfo', userSchema)