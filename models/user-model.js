const mongoose = require('mongoose')
const validator = require('validator')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

const userSchema = mongoose.Schema({
    email:{
        type:String,
        required: true,
        unique: true,
        trim: true,
        lowercase: true,
        validate: function(value){
            if (!validator.isEmail(value)){
                throw new Error("Email is not valid")
            }
        }
    },
    password:{
        type:String,
        required:true,
        trim:true,
    },
    role:{
        type:String,
        enum: ['user','admin'],
        default: 'user',
    },
    createAt:{
        type: Date,
        default: Date.now(),
    },
    rights: {
        type:[String],
    }
})

userSchema.methods.generateToken = async function(expiresIn="30m"){
    const user = this
    const obj = {id:user._id, position:user.position, role:user.role, rights: user.rights}
    const token = jwt.sign(obj,process.env.JWT_SECRET,{expiresIn:expiresIn})
    console.log('Token:', token);
    return token
    // jwt.sign(obj, process.env.JWT_SECRET, {expiresIn: expiresIn}).then(token=>{
    //     console.log('Token:', token);
    //     return token
    // })
}

userSchema.methods.checkPassword = async function(password){
    const user = this
    const match = await bcrypt.compare(password, user.password)
    return match;
}

userSchema.pre('save', async function(next){
    const user = this
    if (user.isModified('password')){
        // const salt = await bcrypt.genSalt(16)
        // const hash = await bcrypt.hash(user.password, salt)
        // user.password = hash
        bcrypt.genSalt(16).then(salt=>{
            bcrypt.hash(user.password, salt).then(hash=>{
                user.password = hash
            })
        })
    }
    next()
})

userSchema.statics.checkEmail = async function(email){
    const user = await this.findOne({email:email})
    return !!user
}

const User = mongoose.model('User',userSchema)

module.exports = { User }