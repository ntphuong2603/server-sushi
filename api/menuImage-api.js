const express = require('express')
const route = express.Router()

const menuImageController = require('../controller/menuImage-ctrl')

route.post('/uploadImage', menuImageController.uploadImage)
route.post('/deleteImageByID', menuImageController.deleteImage)

module.exports = route