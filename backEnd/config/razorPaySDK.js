const Razorpay = require('razorpay');

const razorPayInstance = new Razorpay({
    key_id: 'rzp_test_QkC39nvjOwKhPw',
    key_secret: 'hWmmnsXehMSsfOajSSqZEesa',
  });

  module.exports = razorPayInstance;