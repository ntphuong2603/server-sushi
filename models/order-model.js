const mongoose = require('mongoose')
const { commonSchema } = require('./commonModel')

const menuOrderSchema = mongoose.Schema({
    name:{
        type:String,
        trim:true,
        required: true,
    },
    code:{
        type:String,
        trim:true,
        uppercase:true,
        required: true,
        unique: true,
    },
    price:{
        type: Number,
        required: true,
    },
    quantity:{
        type:Number,
        default: 1
    }
})

const orderSchema = mongoose.Schema({
    table:{
        type:String,
        require: true,
        trim: true,
        lowercase: true,
    },
    menuList:{
        type:[menuOrderSchema],
        require: true,
    },
    sum:{
        type:Number,
    },
    tax:{
        type:Number,
    },
    tip:{
        type:Number,
        default: 0
    },
    total:{
        type:Number,
    },
    ...commonSchema
})

const Order = mongoose.model('Order', orderSchema)
const MenuOrder = mongoose.model('MenuOrder', menuOrderSchema)

module.exports = { Order, MenuOrder }