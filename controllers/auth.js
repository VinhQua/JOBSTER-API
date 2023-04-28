const User = require('../models/User')
const {StatusCodes}= require('http-status-codes')
const bcrypt = require('bcryptjs')

const register = async (req, res, next) => {
    const {name, password,email} = req.body
    
    const salt = await bcrypt.genSalt(10)
    const hashedPassword = await bcrypt.hash(password,salt)
    
    const tempUser = {name, password:hashedPassword, email}

    const user = await User.create({...tempUser})

    res.status(StatusCodes.CREATED).json({success:true,user})
}

const login = async (req, res, next) => {
    
    
}

module.exports = {
    register,
    login
}