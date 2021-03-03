const mongoose = require('mongoose')
const validator = require('validator')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

const userSchema = mongoose.Schema({
    email:{
        type:String,
        required: true,
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

userSchema.methods.generateToken = (expiresIn="30m") => {
    const user = this
    const obj = {id:user._is,position:user.position, role:user.role}
    const token = await jwt.sign(obj,process.env.JWT_TOKEN,{expiresIn:expiresIn})
    return token
}

userSchema.methods.checkPassword = async (password) => {
    const user = this
    const match = await bcrypt.compare(password, user.password)
    return match;
}

userSchema.pre('save', async function(next){
    const user = this
    if (user.isModified('password')){
        const salt = await bcrypt.genSalt(16)
        const hash = await bcrypt.hash(user.password, salt)
        user.password = hash
    }
    next()
})

userSchema.statics.checkEmail = async (email) => {
    const user = await this.findOne({email:email})
    return !user
}

const User = mongoose.model('User',userSchema)

module.exports = { User }