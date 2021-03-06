const jwt = require('jsonwebtoken')
const { User } = require('../models/user-model')

require('dotenv').config()

exports.checkToken = (req, res, next) => {
    try{
        const token = req.headers[process.env.TOKEN_NAME]
        if (token){
            const obj = jwt.verify(token,process.env.JWT_SECRET)
            // console.log('Obj:',obj, Date.now() <= obj.exp*1000);
            if (obj){
                res.locals.userData = obj
            }
        }
        next()
    } catch (error){
        // res.status(401).json({message:'Token is invalid', errors: error})
        next()
    }
}

exports.checkUser = async(req, res, next) => {
    try{
        const userInfo = res.locals.userData
        if (userInfo){
            const user = await User.findOne({_id:userInfo.id})
            if (!user){
                res.status(401).json({message: 'User not found'})
            }
            req.user = user
        }
        next()
    } catch (error){
        next()
    }
}

exports.setHeaders = (req, res, next) => {
    // res.setHeader({
    //     // Website you wish to allow to connect
    //     "Access-Control-Allow-Origin":"*",
    //     // Request methods you wish to allow
    //     "Access-Control-Allow-Methods":"GET,POST",
    //     // Request headers you wish to allow
    //     // "Access-Control-Allow-Headers":"Content-type,*",
    //     // Set to true if you need the website to include cookies in the requests sent
    //     // to the API (e.g. in case you use sessions)
    //     "Access-Control-Allow-Credentials":true,
    // })
    res.setHeader("Access-Control-Allow-Origin","http://localhost:3000")
    res.setHeader("Access-Control-Allow-Methods","GET,POST")
    res.setHeader("Access-Control-Allow-Credentials",true)
    next()
}