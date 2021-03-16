const mongoose = require('mongoose')
const validator = require('validator')
const { commonSchema } = require('./commonModel')

const menuSchema = mongoose.Schema({
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
    description:{
        type:String,
    },
    image:{
        type:mongoose.Types.ObjectId,
    },
    price:{
        type: Number,
        required: true,
    },
    station:{
        type:String,
        enum:['sushi-bar','kitchen','both'],
        default: 'kitchen',
    },
    category:{
        type: mongoose.Types.ObjectId,
        require: true,
    },
    ...commonSchema
})

menuSchema.statics.checkMenuCode = async function(code){
    const menu = await this.findOne({code:code})
    return !!menu    
}

const Menu = mongoose.model('Menu',menuSchema)

module.exports = { Menu }