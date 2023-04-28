const mongoose = require('mongoose');

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

module.exports = mongoose.model('User',UserSchema)