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
    image:{
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
    },
    isActive:{
        type:Boolean,
        default: true,
    },
    station:{
        type:String,
        enum:['sushi-bar','kitchen','both'],
        default: 'kitchen',
    }
})

menuSchema.statics.checkMenuCode = async function(code){
    const menu = await this.findOne({code:code})
    return !!menu    
}

const Menu = mongoose.model('Menu',menuSchema)

module.exports = { Menu }