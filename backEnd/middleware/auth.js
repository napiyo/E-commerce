const catchAsyncError = require('./catchAsyncError');
const ErrorHandler = require('../utils/errorHandler');
const jwtoken = require('jsonwebtoken');
const userModel = require('../models/userSchema');



exports.isAuthenticated = catchAsyncError(async(req,res,next)=>{
     //get token from cookie
     const {token} = req.cookies;
     if(!token){
         return next(new ErrorHandler("please login to use this resource",401));
     }

     // token found store user data in req

     // decode id from token
     const {id} = jwtoken.verify(token,process.env.JWT_SECRET); 
     const user = await userModel.findById(id);
     if(!user){
         return next(new ErrorHandler("invalid token , please login again",401));
     }
     req.user = user;
     next()
})

exports.authorizedRoles = (...roles)=>{
    return (req,res,next)=>{
        if(!roles.includes(req.user.role)){
           return next(new ErrorHandler(`your Role ${req.user.role} is not authorized to access this resource`,403)
           )}
          
            next();
         
    };
};