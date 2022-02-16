const express = require('Express');
const app = express();
const errorMiddleware = require('./middleware/error')


app.use(express.json());

// import routes

const productRouter = require('./routes/productsRoutes.js');
app.use('/api/v1/products',productRouter);

// middleware for error
app.use(errorMiddleware)

module.exports =app;