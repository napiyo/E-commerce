const mongoose = require('mongoose');


const productSchema = new mongoose.Schema({
    name:{
        type:String,
        required:[true,"Product Name is required"],
        trim:true
    },
    description:{
        type:String,
        required:[true,"Product discription is required"]
    },
    price:{
            type:Number,
            required:[true,"product price is required "],
            maxLength:[8,"price cannot exceed 8 digit length"]
    },
    rating:{
        type:Number,
        default:0
    },
    images:[
       { public_id:{
            type:String,
            required:true
        },
        public_url:{
            type:String,
            required:true
        }}
    ],
    category:{
        type:String,
        required:[true,"please Enter product category"]
    },
    Stock:{
        type:Number,
        required:[true,"please enter product stock"],
        maxLength:[4,"max stock is 9999"],
        default:1
    },
    numOfReviews:{
        type:Number,
        default:0
    },
    reviews:[{
        name:{
            type:String,
            required:true,
        },
        rating:{
            type:String,
            required:true,
        },
        comment:{
            type:String,
             required:true
        }
    }],
    createdBy:{
        type:mongoose.Schema.ObjectId,
        ref:"user",
        required:true
    }
    ,
    createdAt:{
        type:Date,
        default:Date.now
    }

})

module.exports = mongoose.model("products",productSchema);