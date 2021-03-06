const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')

require('dotenv').config()

const server = express()
server.use(bodyParser.json())
// server.use(cors())
server.use(cors({origin:"http://localhost:3000", credentials: true}));

const port = process.env.PORT || 5000

server.listen(port, ()=>{
    console.log(`Node server is running on ${port}`);
})

const mongoose = require('mongoose')

const dbConnectionString = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.v7oxv.mongodb.net/${process.env.DB_NAME}?retryWrites=true&w=majority`

mongoose.connect(dbConnectionString, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify: true,
})

const { checkToken } = require('./auth/auth')
server.use(checkToken)

const userApi = require('./api/user-api')
server.use('/api/users', userApi)

const menuApi = require('./api/menu-api')
server.use('/api/menus', menuApi)

const categoryApi = require('./api/category-api')
server.use('/api/categories', categoryApi)