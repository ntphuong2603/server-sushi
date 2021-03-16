const express = require('express')
const categoryController = require('../controller/category-ctrl')

const router = express.Router()

router.post('/delete', categoryController.deleteCategory)
router.post('/create', categoryController.createCategory)
router.get('/get', categoryController.getCategoryByID)
router.post('/update', categoryController.changeCategoryName)

router.get('/getAllCategories', categoryController.getAllCategories)

module.exports = router