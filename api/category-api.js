const express = require('express')
const categoryController = require('../controller/category-ctrl')

const router = express.Router()

router.post('/delete', categoryController.deleteCat)
router.post('/create', categoryController.createCat)
router.get('/read', categoryController.readCat)
router.post('/update', categoryController.updateCat)

router.get('/readAll', categoryController.readAll)

module.exports = router