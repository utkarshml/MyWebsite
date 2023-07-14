export const ErrorMiddlewares = (err , req , res , next)=>{
    err. message = err.message || "NOT fOUND"
    err.statusCode = err.statusCode || 404
    res.status(err.statusCode).json({
        success:false,
        message:err.message
    })
}