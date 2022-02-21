const catchAsyncError = require("../middleware/catchAsyncError");
const userModel = require("../models/userSchema");
const ErrorHandler = require("../utils/errorHandler");
const sendToken = require("../utils/jswtoken");
const validator = require('validator');
const sendEmail = require('../utils/sendEmail.js');
const crypto = require('crypto');
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
            return next(new ErrorHandler("Email or password invalid",406));
        }
     
    // check password
    const passwordMatched = await user.comparePassword(password);
     if(!passwordMatched){
         return next(new ErrorHandler("Email or password invalid",401));
         }

    // password matched
        sendToken(user,200,res);
});


// logOut user
exports.logout = catchAsyncError(async(req,res,next)=>{
          
    const {token} = req.cookies;
    console.log(token);
    if(!token){
        return next(new ErrorHandler("no user logged in to log out",401));
    }
    
    res.cookie("token",null,{
                expires:new Date(Date.now()),
                httpOnly:true
            })
            res.status(200).json({
                success:true,
                message:"logged out successfully"
            })
})




// Forgot password - get token and send
exports.forgotPassword = catchAsyncError(async(req,res,next)=>{
  const email = req.body.email;
  // if email is empty  
  if(!email){
        return next(new ErrorHandler("please Enter a email"))
    }
    // if email is not valid format
    if(!validator.isEmail(email)){
            return next(new ErrorHandler("please Enter a valid Email"));
        }

        // getting user
        const user = await userModel.findOne({email:req.body.email});
        // if user not found
        if(!user){
            return next(new ErrorHandler("user Not found"));
    }
    // get resetPasswordToken
    const resetToken = await user.getPasswordResetToken();
    // save the user with reset token -- in schema method generated

    await user.save({validateBeforeSave:false});


    const resetPasswordURL = `${req.protocol}://${req.get("host")}/api/v2/users/password/reset/${resetToken}`
    

    // message for email to send to user
    const message = `your Password reset token is :
    
    ${resetPasswordURL}`;


    try{
        await sendEmail({
            email:user.email,
            subject:`password reset For Bookies-Ecommerce - Narendra Dewasi project`,
            message

        });
        res.status(200).json({
            success:true,
            message:`Password reset link has been sent to ${user.email} successfully`,
        })

    }
    catch(err){
            // reset password failed reset token to undifined
            user.resetPasswordToken= undefined;
            user.resetPasswordExpire= undefined;
            await user.save({validateBeforeSave:false})
            return next(new ErrorHandler(err.message,500));

    }
})


// reset password 
exports.resetpassword = catchAsyncError(async (req,res,next)=>{
            const resetToken = req.params.token;
           
            // generating hash
            const resetTokenHash = crypto.createHash('sha256').update(resetToken).digest('hex');
     
            const user = await userModel.findOne({
                resetPasswordToken:resetTokenHash,
                resetPasswordExpire:{
                    $gt:Date.now()
                }
            })
                // if token is expired
             
                if(!user){
                    return next(new ErrorHandler("token is invalid or expired",403));
                }

                // if password or confirm password is empty
                if(!req.body.newPassword || !req.body.confirmPassword){
                    return next(new ErrorHandler("password and confirm password both are required",400));
                            
                }
            if(req.body.newPassword != req.body.confirmPassword){
                     return next(new ErrorHandler("new password does not match with confirm password",400));
            }
            // change password
            user.password = req.body.newPassword;
            // reset tokens for reset password
            user.resetPasswordToken= undefined;
            user.resetPasswordExpire= undefined;
            // save data
           await user.save();

            // login user
            sendToken(user,200,res);


})

// update password -- when user doesnt forgot password just he wants to update
exports.updatePassword = catchAsyncError(async (req,res,next) =>{

    // get user
    const user = await userModel.findById(req.user.id).select("+password");
    // comapre old password
    const oldPasswordMatched = await user.comparePassword(req.body.oldPassword);
    if(!oldPasswordMatched){
        return next(new ErrorHandler("old password is incorrect",400));
    }
    if(req.body.newPassword !== req.body.confirmPassword){
        return next(new ErrorHandler("new password and confirm password does not match",400));

    }

    user.password = req.body.newPassword;
    await user.save();
    sendToken(user,200,res);

})

// update current user details
exports.updateProfile = catchAsyncError(async(req,res,next)=>{


    const detailsTobeUpdated = {
        email:req.body.email,
        name:req.body.name,
    }
    const user = await userModel.findByIdAndUpdate(req.user.id,detailsTobeUpdated,{
        new:true,
        runValidators:true,
        useFindAndModity:false
        
    });
    res.status(200).json({
        success:true,
        user
    })
})


// get current user details -self
exports.getUserDetails = catchAsyncError(async(req,res,next)=>{
    const user = await userModel.findById(req.user.id);
    res.status(200).json({
        success:true,
        user
    })
})

// get user details - Admin only
exports.userDetails = catchAsyncError(async(req,res,next)=>{
    const user = await userModel.findById(req.params.id);
    if(!user){
            next(new ErrorHandler(`no user found- invalid id ${req.params.id}`))
    }
    res.status(200).json({
        success:true,
        user
    })
})

// get all user -admin only
exports.getUsers = catchAsyncError(async(req,res,next)=>{
    const Users = await userModel.find();
    res.status(200).json({
        success:true,
        Users
    })
})

// update user Role -- admin
exports.updateUserRole = catchAsyncError(async(req,res,next)=>{


    const detailsTobeUpdated = {
        role:req.body.role,
    }
    const user = await userModel.findByIdAndUpdate(req.params.id,detailsTobeUpdated,{
        new:true,
        runValidators:true,
        useFindAndModity:false
        
    });
    if(!user){
        return next(new ErrorHandler("user not found",404));
    }
    res.status(200).json({
        success:true,
        message:`role has been changed to ${req.body.role} for the user`
    })
})
// delete user
exports.deleteUser = catchAsyncError(async(req,res,next)=>{

     const user = await userModel.findById(req.params.id);

    if(!user){
        return next(new ErrorHandler("user not found",404));
    }
    user.remove();
    res.status(200).json({
        success:true,
        message:"user deleted"
    })
})
