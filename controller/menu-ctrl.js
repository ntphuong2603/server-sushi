const { Menu } = require('../models/menu-model')
const { MenuImage } = require('../models/menuImage-model')
const resFunctions = require('../utils/res')
const fs = require('fs')
// const { checkUser } = require('../auth/auth')
// const multer = require('multer')

require('dotenv').config()

exports.createMenu = async (req, res) => {
    try{
        
        const files = req.files

        if (await Menu.checkMenuCode(req.body.code)){
            return resFunctions.resError(res, 400, 'Menu code already existed!')
        }

        const menu = new Menu({
            name:req.body.name,
            code:req.body.code,
            price:parseFloat(req.body.price),
            createBy:req.body.userID,
            category:req.body.category,
            station:req.body.station,
        })

        if (files.length > 0){
            const menuImage = await MenuImage.create({menuID:menu._id, createBy:req.body.userID})

            files.map(file=>{
                fs.realpath(file.path, (error, result)=>{
                    if (error){
                        console.log('Error:', error);
                    }
                    console.log('Result 1:', result);
                    const newName = result.replace('.',`-${menu._id}.`)
                    fs.rename(result, newName, ()=>{
                        console.log('Rename:', newName);
                        menuImage[file.fieldname] = newName
                        menuImage.save()
                        menu.image = menuImage._id
                    })
                })
            })
        }
        
        const doc = await menu.save()
        return resFunctions.resSuccess(res, 200, 'Menu created successfully', getMenuInfo(doc))

    } catch (error){
        return resFunctions.resError(res, 401, error.message)
    }
}

exports.getMenuByID = async (req, res) => {
    try{

        const _id = req. body.menuID
        const menu = await Menu.findById({_id})
        return resFunctions.resSuccess(res, 200, null, getMenuInfo(menu))

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
        const _id = req.body.menuID
        const menu = await Menu.findById({_id})
        menu.isActive = false
        menu.save()
        resFunctions.resSuccess(res, 200, null, getMenuInfo(menu))
    } catch (error){
        console.log(error);
        res.status(401).json({error:true, msg:"User does not authenticate"})
    }
}

exports.getAllMenus = async (req, res) => {
    try{
        const isActive = req.body.isActive===undefined ? true : req.body.isActive
        const menus = await Menu.find({isActive})
        return resFunctions.resSuccess(res, 200, null, getAll(menus))
    } catch (error){
        console.log(error);
        res.status(401).json({error:true, msg:"User does not authenticate"})
    }
}

exports.getAllMenuOrder = async (req, res) => {
    try {
        const isActive = req.body.isActive===undefined ? true : req.body.isActive
        const menus = await Menu.find({isActive})
        
        console.log('Menus:', menus);
        return resFunctions.resSuccess(res, 200, nul, getAllMenuOrder(menus))
    } catch (error) {
        console.log(error);
        res.status(401).json({error:true, msg:"User does not authenticate"})
    }
}

const getAll = (menus) => (
    menus.map(menu=>(getMenuInfo(menu)))
)

const getMenuInfo = (menu) => ({
    id:menu._id,
    name:menu.name,
    code:menu.code,
    price:menu.price,
    category:menu.category,
    station:menu.station,
    description:menu.description,
    // status:menu.isActive ? "active" : "deleted",
})

const getAllMenuOrder = (menus) => (
    menus.map(menu=>(getMenuOrder(menu)))
)

const getMenuOrder = (menu) => ({
    id:menu._id,
    name:menu.name,
    code:menu.code,
    price:menu.price,
})