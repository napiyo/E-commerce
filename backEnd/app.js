const express = require('Express');
const errorMiddleware = require('./middleware/error')
const cookieParser = require('cookie-parser');
const cors = require('cors');
const productRouter = require('./routes/productsRoutes.js');
const userRouter = require('./routes/userRoutes.js');
const orderRouter = require('./routes/orderRoutes.js');
const bodyParser = require('body-parser')

const app = express();
app.use(express.json());
app.use((req, res, next) => {
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.header(
      "Access-Control-Allow-Headers",
      "Origin, X-Requested-With, Content-Type, Accept,Authorization"
    );
    if(req.method==='OPTIONS'){
        res.header('Access-Control-Allow-Methods','PUT, POST, PATCH, DELETE, GET')
        return res.status(200).json({});
    }
    next();
  });
app.use(cookieParser());
app.use(cors());
app.use(bodyParser.urlencoded({extended:false}))

app.use(bodyParser.json())

// import routes

app.use('/api/v1/products',productRouter);
app.use('/api/v2/users',userRouter);
app.use('/api/v3/orders',orderRouter);

// middleware for error
app.use(errorMiddleware)

module.exports =app;