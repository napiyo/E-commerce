const orderModel = require('../models/orderSchema');
const productModel = require('../models/productSchema');
const catchAsyncError = require('../middleware/catchAsyncError');
const ErrorHandler = require('../utils/errorHandler');



// update stocks
const updateStocks = async(productId,quantity)=>{
    const product = await productModel.findById(productId);
    if(!product){
        return new ErrorHandler("product not found",404);
    }
    product.Stock+=quantity;
    product.unitSold-=quantity;

    product.save();
}



// place a order
exports.makeOrder = catchAsyncError(async(req,res,next)=>{
    req.body.orderedBy = req.user._id;
    req.body.orderedAt=Date.now();

    const newOrder = await orderModel.create(req.body);

    if(!newOrder){
        return next(new ErrorHandler("order failed.. try again.. if payment is done please contact admin",401));
    }
    req.body.orderedItem.forEach(async (item)=>{
        await updateStocks(item.productId,-1*(item.quantity));
    })
    
    res.status(200).json({
        success:true,
        newOrder
    })

})
// get single order details - admin
exports.getSingleOrder = catchAsyncError(async(req,res,next)=>{

    // get order with name and email of user (in orderedBy)
    const order = await orderModel.findById(req.params.id).populate("orderedBy","name email");
    if(!order){
        return next(new ErrorHandler("order not found",404))
    }
    res.status(200).json({
        success:true,
        order
    })
})

// get my orders
exports.getMyOrders = catchAsyncError(async(req,res,next)=>{
   
    const order = await orderModel.find({orderedBy:req.user._id});
   
    res.status(200).json({
        success:true,
        order
    })
})

// get all orders --admin
exports.getAllOrders = catchAsyncError(async(req,res,next)=>{
  
    const order = await orderModel.find();
    let totalAmount =0;
    order.forEach((order)=>{
        totalAmount+= order.price.totalPrice;
    })
   
    res.status(200).json({
        success:true,
        totalAmount,
        order

    })
})

// update order status -- admin
exports.updateOrderStatus = catchAsyncError(async(req,res,next)=>{
  
    const order = await orderModel.findById(req.params.id);
  if(!order){
      return next(new ErrorHandler("order not found",403))
  }
  if(order.orderStatus === "delivered"){
      return next(new ErrorHandler("order is delivered , cant update status"),403)
  }
    order.orderStatus=req.body.status;
    
    if(req.body.status==="delivered"){
        order.deliveredAt=Date.now()
    }
    if(req.body.status==="canceled"){
        order.orderedItem.forEach(async (item)=>{
            await updateStocks(item.productId,item.quantity);
        })
    }
    await order.save({validateBeforeSave:false})
    res.status(200).json({
        success:true,
        order

    })
})
// cancel order by user
exports.cancelMyOrder = catchAsyncError(async(req,res,next)=>{
  
    const order = await orderModel.findById(req.params.id);
    if(order.orderedBy.toString() !== req.user._id.toString()){
        return next(new ErrorHandler("you can cancel only your product",403))
    }
    if(!order){
        return next(new ErrorHandler("order not found",403))
    }
  if(order.orderStatus === "delivered"){
      return next(new ErrorHandler("order is delivered , cant update status"),403)
  }
  if(order.orderStatus === "canceled"){
    return next(new ErrorHandler("order is already canceled , cant update status"),403)
}
            order.orderedItem.forEach(async (item)=>{
            await updateStocks(item.productId,item.quantity);

        })
        order.orderStatus="canceled";

    await order.save({validateBeforeSave:false})
    res.status(200).json({
        success:true,
        order

    })
})
