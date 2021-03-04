const jwt = require('jsonwebtoken')
const { User } = require('../models/user-model')

require('dotenv').config()

exports.checkToken = (req, res, next) => {
    try{
        const token = req.headers[process.env.TOKEN_NAME]
        if (token){
            const obj = jwt.verify(token,process.env.JWT_SECRET)
            console.log('Obj:',obj, Date.now() <= obj.exp*1000);
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