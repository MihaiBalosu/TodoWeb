const express = require('express')
require('./db/mongoose')
const path = require('path')
const router = new express.Router()
const User = require('../models/user')
const validator = require('validator')
const bcrypt = require('bcryptjs')
const Todo = require('../models/todo')

const app = express()

const publicDirectoryPath = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../templates/views')

app.set('view engine', 'hbs')
app.set('views', viewsPath)

app.use(express.static(publicDirectoryPath))

app.get('', (require, res) => {
    res.render('startPage')
})

app.get('/login', (require, res) => {
    res.render('login')
})

app.get('/signUp', (require, res) => {
    res.render('signUp')
})

app.get('/welcome', (req, res) => {
    res.render('welcome')
})

app.get('/myProfile', (require, res) => {
    res.render('myProfile')
})

app.get('/myTodos', (require, res) => {
    res.render('myTodos')
})

app.get('/myTodos/addTodo', (req, res) => {
    res.render('addTodo')
})

app.post('/login', async (req, res) => {
    if (!req.query.email || !req.query.password) {
        return res.send({
            result: 'No email is inserted',
            canContinue: false
        })
    }
    if (!validator.isEmail(req.query.email)) {
        return res.send({
            result: 'Email is not valid',
            canContinue: false
        })
    }else {
        const email = req.query.email
        const passwordFromInput = req.query.password
        await User.findOne({email}, async (err, user) => {
            if(err){
                return res.status(400).send({
                    result: 'Error 400',
                    canContinue: false
                })
            }else {
                const userPassword = user.password
                const match = await bcrypt.compare(passwordFromInput, userPassword)
                if (match) {
                    return res.send({
                        result: 'Welcome',
                        canContinue: true
                    })
                } else {
                    return res.send({
                        result: 'Password is incorrect',
                        canContinue: false
                    })
                }
            }
        })


    }
})



app.post('/signUp', async (req, res) => {
    if(!req.query.email || !req.query.username || !req.query.password){
        return res.send({
            result: 'All fields must be completed',
            canContinue: false
        })
    }
    if(!validator.isEmail(req.query.email)){
        return res.send({
            result: 'Email is not valid',
            canContinue: false
        })
    }
    const user = new User({
        email: req.query.email,
        username: req.query.username,
        password: req.query.password
    })
    await User.findOne({email: user.email}, async (err, user1) => {
        if(err){
            return res.send('error')
        }else if(user1){
            return res.send({
                result: 'This email is used, please try another',
                canContinue: false
            })
        }
        else if(!user1) {
            try {
                await user.save()
                res.send({
                    result: 'Confirm',
                    canContinue: true
                })
            } catch (e) {
                res.send({
                    error: 'Error',
                    canContinue: false
                })
            }
        }
    })
})

app.post('/addTodo', async (req, res) => {
    if(!req.query.mail || !req.query.name || !req.query.description){
        return res.send({
            result: 'All fields must be completed',
            canContinue: false
        })
    }
    if(!validator.isEmail(req.query.mail)){
        return res.send({
            result: 'Email is not valid',
            canContinue: false
        })
    }else {
        const todo = new Todo({
            name: req.query.name,
            description: req.query.description,
            user: req.query.mail
        })
        try {
            await todo.save()
            res.send({
                result: 'Confirm',
                canContinue: true
            })
        } catch (e) {
            console.log('nu')
            res.send({
                error: 'Error',
                canContinue: false
            })
        }
    }
})

app.post('/myTodos', async (req, res) => {
    const mail = req.query.mail
    await Todo.find({user: mail}, (req, todos) => {
        const todoList = {
            todos:[]
        }
        todos.forEach((todo) => {
                todoList.todos.push(todo)
        })
        return res.send({
            result: todoList
        })
    })
})

app.post('/complete', async (req, res) => {
    const mail = req.query.mail
    const description = req.query.description
    const status = req.query.status
        await Todo.updateOne({user: mail, description: description, status:status}, {status: 'Completed'}, () => {
            res.send()
        })

})

app.post('/incomplete', async (req, res) => {
    const mail = req.query.mail
    const description = req.query.description
    const status = req.query.status
    await Todo.updateOne({user: mail, description: description, status:status}, {status: 'Incompleted'}, () => {
        res.send()
    })

})


app.post('/delete', async (req, res) => {
    const mail = req.query.mail
    const des = req.query.description
    const name = req.query.name
    const x = await Todo.deleteOne({name: name, description: des, user: mail}, (err) => {
        console.log(err)
        res.send()
    })
})

app.listen(3000, () => {
    console.log('Server is up on port 3000.')
})
