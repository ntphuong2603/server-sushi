const express = require('express')
const router = express.Router()

const { User } = require('../models/user-model')

const { checkUser } = require('../auth/auth')

router.route('/register').post(async(req, res)=>{
    try{
        
        if (await User.checkEmail(req.body.email)){
            res.status(400).json({error:true, msg:"Email already existed."})
        }

        const user = new User({
            email: req.body.email,
            password: req.body.password,
        })

        const doc = await user.save()
        
        res.status(200).json({success:true, msg:"User successfully resgisted", data:getUserInfo(doc)})
    } catch (error){
        res.status(401).json({error: true, msg: error})
    }
})

router.route('/login').post(async(req, res)=>{
    try{
        console.log('Body:', req.body);
        const user = await User.findOne({email: req.body.email})
        console.log("User:",user);
        if (user){
            res.status(400).json({error: true, msg:"Email doesn't exist"})
        }

        const checkPasswordResult = await user.checkPassword(req.body.password)
        if (!checkPasswordResult){
            res.status(400).json({error: true, msg:"Password is incorrect"})
        }

        const token = await user.generateToken()
        res.status(200).json({success:true, msg:"User successfully logged in", data:getUserInfo(user, token)})
    } catch (error){
        res.status(401).json({error: true, msg: error})
    }
})

router.route('/isUserAuthenticate').get(checkUser, async(req, res)=>{
    try{
        res.status(200).json({success:true, msg:"Use authenticated", data:getUserInfo(req.user)})
    } catch (error){
        res.status(401).json({error:true, msg:"User does not authenticate"})
    }
})

const getUserInfo = (user, token=null) => ({
    id: user._id,
    role: user.role,
    rights: user.rights,
    token: token===null ? null : {
        name: process.env.TOKEN_NAME,
        value: token
    }
})

module.exports = router