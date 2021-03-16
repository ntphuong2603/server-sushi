const mongoose = require('mongoose')
const { commonSchema } = require('./commonModel')

const categorySchema = mongoose.Schema({
    name:{
        type:String,
        lowercase:true,
        trim: true,
        uniquie: true,
        required: true,
    },
    sampleList: {
        type: [mongoose.Types.ObjectId],
        default:[]
    },
    ...commonSchema
})

categorySchema.statics.checkCategoryName = async function(categoryName){
    const cat = await this.findOne({name:categoryName})
    return !!cat
}

const Category = mongoose.model('Category', categorySchema)

module.exports = { Category }