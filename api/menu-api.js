const express = require('express')
const menuController = require('../controller/menu-ctrl')

const router = express.Router()

const multer = require('multer')

const storage = multer.diskStorage({
    destination:function(req, file, cb){
        // console.log('Req:', req.body)
        console.log('Destination File:', file);
        cb(null, './files')
    },
    filename: function(req, file, cb){
        console.log('File:',file);
        cb(null, file.fieldname + file.originalname.slice(-4))
    }
})

const upload = multer({storage})

// router.post('/create', upload.single('dinein'), menuController.createMenu)
router.post('/create', upload.any(), menuController.createMenu)
router.get('/getMenuByID', menuController.getMenuByID)
router.post('/update', menuController.updateMenu)
router.post('/delete', menuController.deleteMenu)

router.get('/getAllMenus', menuController.getAllMenus)
router.get('/getAllMenuOrder', menuController.getAllMenuOrder)

module.exports = router