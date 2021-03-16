const mongoose = require('mongoose')

const commonSchema = {
    isActive:{
        type:Boolean,
        default:true,
    },
    createAt:{
        type: Date,
        default: Date.now()
    },
    createBy:{
        type: mongoose.Types.ObjectId,
        required: true
    },
    updateAt:{
        type:Date
    },
    updateBy:{
        type: mongoose.Types.ObjectId,
    }
}

module.exports = { commonSchema }