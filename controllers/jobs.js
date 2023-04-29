const {StatusCodes} = require('http-status-codes');
const {NotFoundError}= require('../errors')
const Job = require('../models/Job')
const getAllJobs = async (req, res, next)=>{
    const userID = req.user.userID;
    const jobs = await Job.find({createdBy:userID})
    res.status(StatusCodes.OK).json({items:jobs.length,jobs: jobs})
}

const createJob = async (req, res, next)=>{
    const newJob = req.body
    newJob.createdBy = req.user.userID;
    const job = await Job.create(newJob);
    res.status(StatusCodes.CREATED).json({job})
}

const getSingleJob = async (req, res, next)=>{
    const userID = req.user.userID
    const jobId = req.params.id
    const job = await Job.findOne({createdBy:userID, _id:jobId})
    if (!job){
        throw new NotFoundError(`Job ${jobId} not found`)
    }
    res.status(StatusCodes.OK).json({job:job})
}

const updateJob = async (req, res, next)=>{
    const userID = req.user.userID;
    const jobId = req.params.id;
    const job = await Job.findOneAndUpdate({createdBy:userID,_id:jobId},req.body,
        {new:true,runValidators:true});
    if (!job) {
        throw new NotFoundError(`no such job with id ${jobId}`)
    }
    res.status(StatusCodes.OK).json({success:true,job:job});

}


const deleteJob = async (req, res, next)=>{
    const userID = req.user.userID;
    const jobId = req.params.id
    const job = await Job.findOneAndDelete({createdBy:userID,_id:jobId});
    if (!job){
        throw new NotFoundError(`No job with id ${jobId}`);
    }
    res.status(StatusCodes.OK).json({success:true,job:job});
}

module.exports = {
    getAllJobs,
    createJob,
    getSingleJob,
    updateJob,
    deleteJob
}