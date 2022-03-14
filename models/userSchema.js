const mongoose = require('mongoose');
const validator = require('validator');
const bcryptjs = require('bcryptjs');
const jwtoken = require('jsonwebtoken');
const crypto = require('crypto');
const userSchema = new mongoose.Schema({
    name:{
        type:String,
        required:[true,"user name is required"],
        maxlength:[30,"name cannot exceed 30 character"],
        minlength:[4,"name should be minimum 4 character long"]
    },
    email:{
        type:String,
        required:[true,"email is required"],
        unique:true,
        validate:[validator.isEmail,"please Enter a valid Email"]
    },
    password:{
        type:String,
        required:[true,"password is required"],
        minlength:[8,"password should be minimum 8 character long"],
        select:false
    },
    role:{
        type:String,
        default:"user",
    },
    resetPasswordToken:String,
    resetPasswordExpire:Date,
})



// encrypting user password
userSchema.pre("save",async function(next){
  if(!this.isModified("password")){
      next();
  }
  this.password =   await bcryptjs.hash(this.password,10);
})


// generate token

userSchema.methods.getJWToken = function(){
  return  jwtoken.sign({id:this._id},process.env.JWT_SECRET,{
        expiresIn:process.env.JWT_EXPIRES_IN,

    })
}
// compare password

userSchema.methods.comparePassword = async function(passwordEnterd){
  return  await bcryptjs.compare(passwordEnterd,this.password);
}


// generating password reset token
userSchema.methods.getPasswordResetToken= async function(){
        
        // generating reset token

        const resetToken =  crypto.randomBytes(20).toString('hex');
      
      // hashing the token
        const tokenCrypto = crypto.createHash('sha256').update(resetToken).digest('hex');
        // add this to current document - user
        this.resetPasswordToken = tokenCrypto;
        // set expire time for this token
        this.resetPasswordExpire = Date.now() + process.env.RESET_PASSWORD_TOKEN_EXPIRES * 60 * 1000;
        return resetToken;


}
module.exports = mongoose.model("User",userSchema);