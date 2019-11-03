const mongoose = require('mongoose')
const crypt = require('bcryptjs')

const userSchema = mongoose.Schema( {
    username: {
        type: String,
        required: true,
        trim: true
    },
    email: {
        type: String,
        trim: true,
        lowercase: true,
        required: true,
    },
    password: {
        type: String,
        required: true,
        trim: true,
        minlength: 7
    }
})

userSchema.pre('save', async function (next) {
    const user = this
    if(user.isModified('password')){
        user.password = await crypt.hash(user.password, 8)
    }
    next()
})

const User = mongoose.model('User', userSchema)

module.exports = User