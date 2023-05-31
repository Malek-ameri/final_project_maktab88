const path = require('path');

const express = require('express');
const createError = require('http-errors');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const swaggerUi = require('swagger-ui-express');
const swaggerJsDoc = require('swagger-jsdoc');

const connectToDatabase = require('./database/database.config');
const routesHandler = require('./routes/routes');

const app = express();
connectToDatabase()
require('./database/redis.config');



// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use('/api-doc',swaggerUi.serve, swaggerUi.setup(swaggerJsDoc({
  swaggerDefinition:{
    info:{
      title:"mkProject",
      version:'1.0.0',
      description:'store'
    },
    servers:[
      {url:'http://127.0.0.1:3000'}
    ]
  },
  apis: ['./routes/**/*.js']
})))

app.use('/', routesHandler);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  const {
    statusCode = 500,
    status = "Error",
    message = "internal server error. not your fault:",
  } = err;

  res.status(statusCode).json({ status, message });
});

module.exports = app;
