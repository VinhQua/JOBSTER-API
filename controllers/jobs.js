
const getAllJobs = async (req, res, next)=>{
    res.send('all jobs');
}

const createJob = async (req, res, next)=>{
    res.send('create job');
}

const getSingleJob = async (req, res, next)=>{
    res.send('get single job');
}

const updateJob = async (req, res, next)=>{
    res.send('update job');
}

const deleteJob = async (req, res, next)=>{
    res.send('delete job');
}

module.exports = {
    getAllJobs,
    createJob,
    getSingleJob,
    updateJob,
    deleteJob
}