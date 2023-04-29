
const { StatusCodes } = require('http-status-codes')
const { object } = require('joi')
const errorHandlerMiddleware = (err, req, res, next) => {
  console.log(err)

  let customErr = {
    //set default
    statusCode:err.statusCode || StatusCodes.INTERNAL_SERVER_ERROR,
    msg:err.message || 'Something went wrong try again later'
  }
  // if (err instanceof CustomAPIError) {
  //   return res.status(err.statusCode).json({ msg: err.message })
  // }
  if(err.code ===11000 && err.code){
    customErr.msg = `Duplicate value entered for ${Object.keys(err.keyValue)} field, please choose another value`
    customErr.statusCode = 400
  }
  if (err.name === `ValidationError`){
    customErr.msg = Object.values(err.errors).map((item)=>item.message).join(',')
    customErr.statusCode = 400
  }
  if(err.name === `CastError`){
    customErr.msg = `No item found with id ${err.value}`
    customErr.statusCode = 404
  }
  // return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ err })
  return res.status(customErr.statusCode).json({ msg:customErr.msg })
}

module.exports = errorHandlerMiddleware
