const express = require('express')
const { checkUser, setHeaders } = require('../auth/auth')
const userController = require('../controller/user-ctrl')

const router = express.Router()

router.post('/register', userController.userRegister)
router.post('/login', userController.userLogin)
router.get('/isUserAuthenticate', checkUser , userController.userAuthenticate)

module.exports = router