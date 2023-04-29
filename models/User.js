const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const UserSchema = mongoose.Schema({
    name:{
        type:String,
        required:[true,'Please provide a name'],
        minLength:[5,'min length is 5'],
        maxLength:[50,'max length is 50'],
    },
    password:{
        type:String,
        required:[true,'Please provide a password'],
        minLength:5,
    },
    email:{
        type:String,
        required:[true,'Please provide a email address'],
        match:[/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
            ,'Please enter a valid email address'
                ],
        unique:true
    }
})

UserSchema.pre('save', async function(){
    const salt = await bcrypt.genSalt(10);
    const hashedpassword = await bcrypt.hash(this.password,salt);
    this.password = hashedpassword
})
UserSchema.methods.createJWT = async function(){

     const token = jwt.sign({UserID:this._id,name:this.name},process.env.JWT_SECRET,{expiresIn:process.env.JWT_LIFETIME})
    return token
    }
UserSchema.methods.comparePassword = async function(candidatePassword){
    const isMatch = await bcrypt.compare(candidatePassword,this.password)
    return isMatch
}

module.exports = mongoose.model('User',UserSchema)