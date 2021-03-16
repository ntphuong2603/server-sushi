const { MenuImage } = require('../models/menuImage-model')
const responseFunction = require('../utils/res')

require('dotenv').config()

exports.uploadImage = async (req, res) => {
    try {
        const menuImageObj = {
            menuCode: req.body.menuCode,
            [req.body.orderType]:req.body.image,
            createBy: req.body.userID
        }

        // const menuImg = await MenuImage({...menuImageObj})

    } catch (error){
        responseFunction.resError(res, 400, error)
    }
}

exports.getMenuImage = async (req, res) => {
    try {
        const menuCode = req.body.menuCode

        const images = await MenuImage.findOne
    } catch (error) {
        responseFunction.resError(res, 400, error)
    }
}

exports.deleteImage = async (req, res) => {
    try {

    } catch (error){
        responseFunction.resError(res, 400, error)
    }
}
