const mongoose = require('mongoose')

require('dotenv').config()

const mongooseUri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.v7oxv.mongodb.net/${process.env.DB_NAME}?retryWrites=true&w=majority`

const options = {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify: true,
}

mongoose.connect(mongooseUri, {...options})

module.exports = { mongoose }