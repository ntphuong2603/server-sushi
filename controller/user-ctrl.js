const { User } = require('../models/user-model')
const resFunctions = require('../utils/res')

require('dotenv').config()

exports.userRegister = async (req, res) => {
    try{
        if (await User.checkEmail(req.body.email)){
            return resFunctions.resError(res, 400, 'Email already existed.')
        }

        const user = new User({
            email: req.body.email,
            password: req.body.password,
        })

        const doc = await user.save()
        return resFunctions.resSuccess(res, 200, 'User successfully resgisted', getUserInfo(doc))
    } catch (error){
        return resFunctions.resError(res, 401, error.message)
    }
}

exports.userLogin = async (req, res) => {
    try{
        console.log('Body:', req.body);
        User.findOne({ email: req.body.email }).then(user=>{
            // console.log('User:', user);
            if (!user){
                return resFunctions.resError(res, 400, "Email doesn't exist")
            }
            user.checkPassword(req.body.password).then(isCorrectPassword=>{
                if (!isCorrectPassword){
                    return resFunctions.resError(res,400, "Password is incorrect")
                }
                user.generateToken(req.body.getToken ? "1d": "30m").then(token=>{
                    // console.log('Token', token);
                    return resFunctions.resSuccess(res, 200, "User successfully logged in", getUserInfo(user, token))
                })
            })
        })
    } catch (error){
        res.status(401).json({error: true, msg: error})
    }
}

exports.userAuthenticate = async (req, res) => {
    try{
        // console.log('Request user:', req);
        if (req.user){
            return resFunctions.resSuccess(res,200,"Use authenticated", getUserInfo(req.user))
            // res.status(200).json({success:true, msg:"Use authenticated", data:getUserInfo(req.user)})
        }
        return resFunctions.resError(res, 401, "Use unauthenticated")
        // res.status(200).json({success:true, msg:"Use authenticated", data:getUserInfo(req.user)})
    } catch (error){
        console.log(error);
        res.status(401).json({error:true, msg:"User does not authenticate"})
    }
}

const getUserInfo = (user, token=null) => ({
    id: user._id,
    role: user.role,
    rights: user.rights,
    token: token===null ? '' : {
        name: process.env.TOKEN_NAME,
        value: token
    }
})