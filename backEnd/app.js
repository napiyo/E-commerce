const express = require('express');
const errorMiddleware = require('./middleware/error')
const cookieParser = require('cookie-parser');
const cors = require('cors');
const productRouter = require('./routes/productsRoutes.js');
const userRouter = require('./routes/userRoutes.js');
const orderRouter = require('./routes/orderRoutes.js');
const paymentsRoutes = require('./routes/paymentsRoutes');

const path = require('path');

const app = express();
app.use(express.json());
app.use(cookieParser());
// app.use(cors())
// app.use(cors({credentials: true, origin: ''}));
app.use('/api/v1/products',productRouter);
app.use('/api/v2/users',userRouter);
app.use('/api/v3/orders',orderRouter);
app.use('/api/v4/payments',paymentsRoutes);

// if( process.env.SITE_MODE ==="PRODUCTION"){
    app.use(express.static(path.join(__dirname,"../frontEnd/build")));
app.get("*",(req,res)=>{
    res.sendFile(path.resolve(__dirname,"../frontEnd/build/index.html"))
})
// }
// middleware for error
app.use(errorMiddleware)


module.exports =app;