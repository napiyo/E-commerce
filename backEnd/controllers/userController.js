const catchAsyncError = require("../middleware/catchAsyncError");
const userModel = require("../models/userSchema");
const ErrorHandler = require("../utils/errorHandler");
const sendToken = require("../utils/jswtoken");

//register new user
exports.registerUser = catchAsyncError( async(req,res,next)=>{
    const newUser = await userModel.create(req.body);
    sendToken(newUser,201,res);
  
})

// logIn user
exports.loginUser = catchAsyncError(async(req,res,next)=>{


    const {email,password} = req.body;
    
    // if email or password is empty
    if(!email || !password){
        return next(new ErrorHandler("email and password both are required",400));
    }

    const user = await userModel.findOne({email}).select("+password");
    // if user not found
        if(!user){
            return next(new ErrorHandler("Email or password invalid",401));
        }
     
// check password
  const passwordMatched = await user.comparePassword(password);
 if(!passwordMatched){
    return next(new ErrorHandler("Email or password invalid",401));
 }

// password matched
sendToken(user,200,res);
});





// get all user
exports.getUsers = catchAsyncError(async(req,res,next)=>{
    const Users = await userModel.find();
    res.status(200).json({
        success:true,
        Users
    })
})