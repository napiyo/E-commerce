const catchAsyncError = require("../middleware/catchAsyncError");
const razorPayInstance = require('../config/razorPaySDK');
exports.newOrder = catchAsyncError(async(req,res,next)=>{
    const order = await razorPayInstance.orders.create({
        amount: req.body.amount * 100,
        currency: "INR",
      })
      res.status(200).json({
          sucess:true,
          message:"order created for razorPay only",
          order
      })
    
})

