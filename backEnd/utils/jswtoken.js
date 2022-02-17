// create token on auth and save in cookies
const sendToken = (user,statusCode,res)=>{
    const token = user.getJWToken();
    const options = {
        expires:new Date(
            // convert days into ms
            Date.now + process.env.COOKIE_EXPIRE * 24*60*60*1000
        ),
        httpOnly:true
    }

    res.status(statusCode).cookie("token",token,options).json({
        success:true,
        user,
        token
    })
    
}

module.exports = sendToken;