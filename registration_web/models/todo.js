const mongoose = require('mongoose')

const Todo = mongoose.model('Todo', {
    name:{
        type: String,
        trim: true,
        required: true
    },
    description: {
        type: String,
        trim: true
    },
    status: {
        type: String,
        default: 'Incompleted'
    },
    user: {
        type: String,
        required: true
    }
})

module.exports = Todo