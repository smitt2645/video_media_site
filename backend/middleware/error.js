// const ErrorHandler = require("../utils/errorHandler");

module.exports = (err,req,res,next) => {
    err.statusCode =  err.statusCode || 500
    err.message =  err.message || "Internal Server Error"

    // req.status(err.statusCode).json({
    //     success:false,
    //     error:err.stack
    // })
}