const mongoose = require('mongoose')
const validator = require('validator')
const { commonSchema } = require('./commonModel')

const menuImage = mongoose.Schema({
    menuID:{
        type:mongoose.Types.ObjectId,
        required: true,
    },
    dinein:{
        type:String,
        default: ''
    },
    takeout:{
        type:String,
        default: ''
    },
    delivery:{
        type:String,
        default: ''
    },
    skipDishes:{
        type:String,
        default: ''
    },
    ...commonSchema
})

const MenuImage = mongoose.model('MenuImage', menuImage)

module.exports = { MenuImage }