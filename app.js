const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser')
const helmet= require('helmet');
const compression = require('compression');
const feedRoute = require('./routes/feedRoute');
const app = express();

//Middleware
app.use((request, response, next) => {
    response.setHeader('Access-Control-Allow-Origin', '*');
    response.setHeader('Access-Control-Allow-Methods', 'OPTIONS, GET, POST, PUT, PATCH, DELETE');
    response.setHeader('Access-Control-Allow-Headers', '*');
    next();
});
app.use(bodyParser.json());
app.use('/feed', feedRoute);
app.use(helmet());
app.use(compression());

//Error handling Middleware
app.use((error, req, res, next) => {
    console.log(error);
    const status = error.statusCode || 500;
    const message = error.message;
    const data = error.data;
    res.status(status).json({ message: message, data: data });
  });
 
  //Moongose Connection to mongoDB
   mongoose
    .connect(
        'mongodb://127.0.0.1:27017/feed',{
          useNewUrlParser: true,
          autoCreate: true,
          useUnifiedTopology: true
        } 
    )
    .then(result => {
      //Starting Server at 2000
      app.listen(2000);
    })
    .catch(err => console.log(err));