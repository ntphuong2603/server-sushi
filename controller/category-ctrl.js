const { Category } = require('../models/category-model')
const resFunctions = require('../utils/res')

exports.createCategory = async (req, res) => {
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

exports.getAllCategories = async (req, res) => {
    try{
        // const isActive = !req.body.isActive ? true : false
        const cats = await Category.find()
        // console.log('Cats', cats);
        return resFunctions.resSuccess(res, 200, null, getAll(cats))
    } catch (error){
        res.status(401).json({error: true, msg: error})
    }
}

exports.getCategoryByID = async (req, res) => {
    try{
        const _id = req.body.categoryID
        const category = await Category.findById({_id})
        return resFunctions.resSuccess(res, 200, null, getInfo(category))
    } catch (error){
        res.status(401).json({error: true, msg: error})
    }
}

exports.changeCategoryName = async (req, res) => {
    try{

    } catch (error){
        res.status(401).json({error: true, msg: error})
    }
}

exports.deleteCategory = async (req, res) => {
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