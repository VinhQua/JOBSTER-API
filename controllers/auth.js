const User = require('../models/User')
const {StatusCodes}= require('http-status-codes')
const bcrypt = require('bcryptjs')
const {BadRequestError,UnauthenticatedError}= require('../errors')
const { response } = require('express')
const register = async (req, res, next) => {

    const user = await User.create({...req.body})
    const token = await user.createJWT()
    res.status(StatusCodes.CREATED).json({success:true,token:token})
}

const login = async (req, res, next) => {
    const {email, password} = req.body
    if(!email || !password){
        throw new BadRequestError('PLease provide email and password')
    }
    const user = await User.findOne({email})
    if (!user) {
        throw new UnauthenticatedError('Invalid Email')
    }
    // compare Password and Hashed Password
    const isCorrectPassword = await user.comparePassword(password)
    if (!isCorrectPassword) {
        throw new UnauthenticatedError('Invalid Password')
    }
    const token = await user.createJWT()
    res.status(StatusCodes.OK).json({user:{name:user.name},token})
}

module.exports = {
    register,
    login
}