const productModel = require("../models/productSchema");
const ErrorHandler = require("../utils/errorHandler");
const catchAsyncError = require("../middleware/catchAsyncError");
const ApiFeatures = require("../utils/apiFeatures");


// get all product -- public // with filter and search

exports.getAllProducts = catchAsyncError(async(req,res)=>{
    const resultPerPage = 15;
    const productCount = await productModel.countDocuments();
    const apifeatures = new ApiFeatures(productModel.find(),req.query).search().filter().pagition(resultPerPage);
    const products = await apifeatures.query;
    res.status(200).json({
        sucess:true,
        productCount,
        products});

    });




// Create Products - Admin Only

 exports.createProduct = catchAsyncError(async(req,res,next) =>{
                const createdProduct = await productModel.create(req.body);
                res.status(201).json({
                    sucess:true,
                    createdProduct
                })

});

// Update Product - Admin only

exports.updateProduct = catchAsyncError(async(req,res,next) =>{
    let productTobeUpdate = await productModel.findById(req.params.id);
    if(!productTobeUpdate){
        return next(new ErrorHandler("product Not Found",404));
    }
    productTobeUpdate = await productModel.findByIdAndUpdate(req.params.id,req.body,{
        new:true,
        runValidators:true,
        useFindAndModify:false
    });
    res.status(200).json({
        sucess:true,
        productTobeUpdate
    })
});


// Delete Product - Admin only

exports.DeleteProduct = catchAsyncError(async(req,res,next) =>{
    let productTobeDeleted = await productModel.findById(req.params.id);
    if(!productTobeDeleted){
       return next(new ErrorHandler("product Not Found",404));
    }
    productTobeDeleted.remove();
    res.status(200).json({
        sucess:true,
        message:"product deleted successfully"
    })
});


// get single product

exports.getSingleProduct = catchAsyncError(async(req,res)=>{
    const product = await productModel.findById(req.params.id);
    if(!product){
        return next(new ErrorHandler("product Not Found",404));
    }
    res.status(200).json(product);

    });
