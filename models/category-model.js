const mongoose = require('mongoose')

const categorySchema = mongoose.Schema({
    name:{
        type:String,
        lowercase:true,
        trim: true,
        uniquie: true,
        required: true,
    },
    createAt:{
        type: Date,
        default: Date.now()
    },
    createBy:{
        type: mongoose.Types.ObjectId,
        required: true,
    },
    updateAt:{
        type: Date,
    },
    updateBy:{
        type: mongoose.Types.ObjectId,
    },
    sampleList: {
        type: [mongoose.Types.ObjectId]
    },
    isActive: {
        type: Boolean,
        default: true,
    }
})

categorySchema.statics.checkCategoryName = async function(categoryName){
    const cat = await this.findOne({name:categoryName})
    return !!cat
}

const Category = mongoose.model('Category', categorySchema)

module.exports = { Category }