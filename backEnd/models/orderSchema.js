const mongoose = require('mongoose');


const orderSchema = mongoose.Schema({
        shippingInfo:{
            address:{
                type:String,
                required:[true,"shipping address is required"]
            },
            state:{
                type:String,
                required:[true,"state is required"]
            },
            pinCode:{
                type:Number,
                required:[true,"pin Code is required"],
                length:[6,"please enter valid 6 digit pin code"]
            },
            phoneNumber:{
                type:Number,
                length:10,
                required:[true,"contact number is required"]
            }
        },
        orderedItem:[{
            productId:{
                type:mongoose.Schema.ObjectId,
                ref:"products",
                required:true 
            },
            quantity:{
                type:Number,
                default:1
            },
            price:{
                type:Number,
                required:true
            },
            name:{
                type:String,
                required:[true,"name is required"]
            }
        }],
        payment:{
            mode:{
                type:String,
                required:[true,"please select payment mode"]
            },
            status:{
                type:String,
                default:"unpaid"
            },
            paymentDetails:{
                type:String,
                default:"unpaid"
            }
           
        },
        orderedBy:{
            type:mongoose.Schema.ObjectId,
            ref:"User",
            required:true 
        },
        orderedAt:{
            type:Date,
            default:Date.now
        },
        price:{
            itemPrice:{
                type:Number,
                required:true
            },
            shippingPrice:{
                type:Number,
                required:true
            },
            totalPrice:{
                type:Number,
                required:true
            }
        },
        orderStatus:{
            type:String,
            default:"processing"
        },
        deliveredAt:Date



})

module.exports = mongoose.model("orders",orderSchema);