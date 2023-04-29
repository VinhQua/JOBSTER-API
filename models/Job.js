const mongoose = require('mongoose');

const jobSchema = new mongoose.Schema({
    company:{
        type:String,
        required:[true,'Please enter a company name'],
        maxLength:[20,'the maximum length of company is 20 characters']
    },
    position:{
        type:String,
        required:[true,'Please enter a position'],
        maxLength:[200,'the maximum length of position is 200 characters']
    },
    status:{
        type:String,
        enum:['interview','declined','pending'],
        default:'pending'
    },
    createdBy:{
        type:mongoose.Types.ObjectId,
        required:[true,'Please provide a user'],
        ref:'User'
    }
},{timestamps:true})

module.exports = mongoose.model('Job',jobSchema)