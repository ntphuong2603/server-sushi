const { Menu } = require('../models/menu-model')
const resFunctions = require('../utils/res')
// const { checkUser } = require('../auth/auth')

require('dotenv').config()

exports.createMenu = async (req, res) => {
    try{
        if (await Menu.checkCode(req.body.code)){
            return resFunctions.resError(res, 400, 'Menu code already existed!')
        }
        const menu = new Menu({
            name:req.body.name,
            code:req.body.code
        })
        const doc = menu.save()

        return resFunctions.resSuccess(res, 200, 'Menu created successfully',doc)
    } catch (error){
        return resFunctions.resError(res, 401, error.message)
    }
}

exports.readMenu = async (req, res) => {
    try{
        
    } catch (error){
        res.status(401).json({error: true, msg: error})
    }
}

exports.updateMenu = async (req, res) => {
    try{
        
    } catch (error){
        res.status(401).json({error: true, msg: error})
    }
}

exports.deleteMenu = async (req, res) => {
    try{
        
    } catch (error){
        console.log(error);
        res.status(401).json({error:true, msg:"User does not authenticate"})
    }
}