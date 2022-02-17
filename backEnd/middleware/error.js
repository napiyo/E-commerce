const ErrorHandler = require("../utils/errorHandler")


module.exports = (err,req,res,next) =>{
    err.statusCode = err.statusCode || 500;
    err.message = err.message || "Internal Server Error"

     //Handling wrong mongodb id eroor
if(err.name === 'CastError'){
    const message = `Resource Not found, Invalid : ${err.path}`;
    err = new ErrorHandler(message,400);
}
//if email is already exist in registring user
if(err.code === 11000){
    err = new ErrorHandler(`Duplicate ${Object.keys(err.keyValue)} Entered`,400)
}

//if jwtToken is invalid
if(err.name === "jsonWebTokenError"){
    err = new ErrorHandler(`JWT token is invalid, login again`,400)
}
//if jwtToken is expired
if(err.name === "tokenExpireError"){
    err = new ErrorHandler(`JWT token is Expired, login again`,400)
}


res.status(err.statusCode).json({
    success:false,
    message:err.message,
})
}