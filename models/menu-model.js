const mongoose = require('mongoose')
const validator = require('validator')

const menuSchema = mongoose.Schema({
    name:{
        type:String,
        trim:true,
        required: true,
    },
    code:{
        type:String,
        trim:true,
        upperCase:true,
        required: true,
        unique: true,
    },
    description:{
        type:String,
    },
    createAt:{
        type: Date,
        default: Date.now()
    },
    createBy:{
        type:String,
        required:true,
    },
    updateAt:{
        type: Date,
        default: null,
    },
    updateBy:{
        type: String,
        default: null,
    },
    price:{
        type: Number,
        required: true,
    }
})

const Menu = mongoose.model('Menu',menuSchema)

module.exports = { Menu }