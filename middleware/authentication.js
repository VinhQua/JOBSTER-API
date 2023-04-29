
const {UnauthenticatedError}= require('../errors')
const jwt = require('jsonwebtoken');

const authMiddleware = async (req, res, next) => {
    const authHeader = req.headers.authorization
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
        throw new UnauthenticatedError('Invalid authorization token');
    } 
    const token = authHeader.split(' ')[1];
    const user = await jwt.verify(token,process.env.JWT_SECRET)
    req.user = {userID:user.UserID,name:user.name};
    next();
}
module.exports = authMiddleware