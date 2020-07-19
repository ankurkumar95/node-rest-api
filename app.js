const express = require('express');
const app = express();
const morgan = require('morgan');
const bodyParser = require('body-parser');


const productRoutes = require('./api/routes/products');
const orderRoutes = require('./api/routes/orders');

//Morgan to log requests in terminal
app.use(morgan('dev'));

//To parse data coming in from post request
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

//Overcoming CORS error, we can also domain restrict instead of *
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header(
        "Access-Control-Allow-Headers",
        "Origin, X-Requested-With, Content-Type, Accept, Authorization"
    );
    //Brower sends OPTION request to find out whit headers are allowed
    if(req.method === 'OPTIONS'){
        res.header('Access-Control-Allow-Methods', 'PUT, POST, PATCH, DELETE, GET');
        return res.status(200).json({});
    }
    next();
});

//Routes to Handle requests
app.use('/products', productRoutes);
app.use('/orders', orderRoutes);

//Handling errors (Should be at the bottom)
app.use((req, res, next) => {
    const error = new Error('Not found');
    error.status = 404;
    next(error);
});

app.use((error, req, res, next) => {
    res.status(error.status || 500);
    res.json({
        error: {
            message: error.message
        }
    });
});

module.exports = app;