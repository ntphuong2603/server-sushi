const express = require('express')
const menuController = require('../controller/menu-ctrl')

const router = express.Router()

router.post('/create', menuController.createMenu)
router.get('/read', menuController.readMenu)
router.post('/update', menuController.updateMenu)
router.get('/delete', menuController.deleteMenu)

router.get('/readAll', menuController.readAll)

module.exports = router