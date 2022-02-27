const productModel = require("../models/productSchema");
const ErrorHandler = require("../utils/errorHandler");
const catchAsyncError = require("../middleware/catchAsyncError");
const ApiFeatures = require("../utils/apiFeatures");


// get all product -- public // with filter and search

exports.getAllProducts = catchAsyncError(async(req,res)=>{
    const resultPerPage = 10;
    const productCount = await productModel.countDocuments();
    let apifeatures = new ApiFeatures(productModel.find(),req.query).search().filter();
    let products = await apifeatures.query
    let filteredProductCount=products.length;
     apifeatures = new ApiFeatures(productModel.find(),req.query).search().filter().pagination(resultPerPage);
  
    products = await apifeatures.query;
    res.status(200).json({
        sucess:true,
        resultPerPage,
        productCount,
        filteredProductCount,
        products});

    });

// get top selling product 
exports.getTopSellingProducts = catchAsyncError(async(req,res)=>{
    
    const products = await productModel.find().sort({unitSold:-1}).limit(req.params.count || 3);
    res.status(200).json({
        sucess:true,
        products});

    });


// Create Products - Admin Only

 exports.createProduct = catchAsyncError(async(req,res,next) =>{
                req.body.createdBy = req.user.id;
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

exports.getSingleProduct = catchAsyncError(async(req,res,next)=>{
    const product = await productModel.findById(req.params.id);
    if(!product){
        return next(new ErrorHandler("product Not Found",404));
    }
    res.status(200).json(product);

    });

// Add review to the product
exports.addReview = catchAsyncError(async(req,res,next)=>{
        
        // find product
        const product = await productModel.findById(req.params.id);
        if(!product){
            return next(new ErrorHandler("product not found",404));
        }
        const ratting =  Number(req.body.ratting);
        const comment = req.body.comment || "no comment";
        // already reviewed ?? then update else add
        const isReviewed = product.reviews.find((review) => review.userId.toString() === req.user._id.toString() );
        
        let totalRatting=Number(product.numOfReviews) * Number(product.avgRatings);
        
        if(isReviewed){
                product.reviews.forEach((review)=>{
                    if(review.userId.toString() == req.user._id.toString()){
                        totalRatting=totalRatting-  (review.ratting || 0);
                        review.ratting=ratting;
                        review.comment =comment;
                    }
                })
        }
        else{
            product.reviews.push({ 
                userId:req.user._id,
                name:req.user.name,
                ratting,
                comment
            })
            
        }
       
        // avg ratting
        
        totalRatting+=ratting;
        totalRatting/=product.reviews.length;
        
        
        product.numOfReviews=product.reviews.length;
        // with only one decimal
        product.avgRatings = Math.round(totalRatting * 10 ) / 10;
       
       
        await product.save({validateBeforeSave:false})


        res.status(200).json({
            success:true,
            message:"review added to the product"
        })
    })

    
// delete a review
exports.deleteReview = catchAsyncError(async(req,res,next)=>{
      
        // find product
        const product = await productModel.findById(req.params.id);
        if(!product){
            return next(new ErrorHandler("product not found",404));
        }
      
        const reviewUserId = req.body.reviewUserId;
        // remove review
        const reviewToDelete = product.reviews.find((review) => review.userId.toString() === reviewUserId.toString() );
  if(reviewToDelete){
    // update avg ratting
    let totalRatting=Number(product.numOfReviews) * Number(product.avgRatings);  
    totalRatting -= reviewToDelete.ratting;
    const updatedReviews = product.reviews.filter((review) => review.userId.toString() !== reviewUserId.toString() );
    totalRatting= (updatedReviews.length==0)?0:totalRatting/ updatedReviews.length;
    

    product.reviews = updatedReviews;
    product.avgRatings = totalRatting;
    product.numOfReviews = updatedReviews.length;
    await product.save({validateBeforeSave:false})
  }
  else{
      return next(new ErrorHandler("review not found",404));
  }
  res.status(200).json({
      success:true,
      message:"review deleted"
  })
            
})

// get categories
exports.getAllCategories = catchAsyncError(async(req,res)=>{
    
    const categories = await productModel.distinct("category");
    res.status(200).json({
        sucess:true,
        categories});

    });

