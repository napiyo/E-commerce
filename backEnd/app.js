const express = require('Express');
const errorMiddleware = require('./middleware/error')
const cookieParser = require('cookie-parser');
const cors = require('cors');
const productRouter = require('./routes/productsRoutes.js');
const userRouter = require('./routes/userRoutes.js');
const orderRouter = require('./routes/orderRoutes.js');

const app = express();

app.use(cookieParser());
app.use(express.json());
app.use(cors());

// import routes

app.use('/api/v1/products',productRouter);
app.use('/api/v2/users',userRouter);
app.use('/api/v3/orders',orderRouter);

// middleware for error
app.use(errorMiddleware)

module.exports =app;