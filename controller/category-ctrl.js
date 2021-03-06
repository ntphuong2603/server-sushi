const { Category } = require('../models/category-model')
const resFunctions = require('../utils/res')

exports.createCat = async (req, res) => {
    try{
        if (await Category.checkCategoryName(req.body.name)){
            return resFunctions.resError(res, 400, 'This category already existed.')
        }

        const cat = new Category({
            name: req.body.name,
            createBy: req.body.userID,
        })

        const doc = await cat.save()
        return resFunctions.resSuccess(res, 200, 'New category creadted successfully', getInfo(doc))
    } catch (error){
        return resFunctions.resError(res, 401, error.message)
    }
}

exports.readAll = async (req, res) => {
    try{
        const isActive = !req.body.isActive ? true : false
        const cats = await Category.find({isActive})
        return resFunctions.resSuccess(res, 200, null, getAll(cats))
    } catch (error){
        res.status(401).json({error: true, msg: error})
    }
}

exports.readCat = async (req, res) => {
    try{

    } catch (error){
        res.status(401).json({error: true, msg: error})
    }
}

exports.updateCat = async (req, res) => {
    try{

    } catch (error){
        res.status(401).json({error: true, msg: error})
    }
}

exports.deleteCat = async (req, res) => {
    try{
        const _id = req.body.catID
        const updateData = {
            isActive:false, 
            updateAt: Date.now(), 
            updateBy: req.body.userID
        }
        Category.findByIdAndUpdate({_id},{...updateData},(err,doc)=>{
            if (err){
                res.status(401).json({error:true, msg: err})
            }
            console.log('Doc:', doc);
            res.status(200).json({success:true,msg:'This item was deleted'})
        })
    } catch (error){
        res.status(401).json({error: true, msg: error})
    }
}

const getAll = (docs) => (
    docs.map(doc=>(getInfo(doc)))
)

const getInfo = (doc) => ({
    id: doc._id,
    name: doc.name,
    sampleList: doc.sampleList,
})