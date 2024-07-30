
var express = require('express');
var bodyParser = require('body-parser');
var path = require('path');
var expressValidator = require('express-validator');
var swaggerJSDoc = require('swagger-jsdoc');
var swaggerUi = require('swagger-ui-express');
var tweeterRouter = require('./routes.js');

const app = new express();

// body-parser middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false}));

// setting the view enginge & static path
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname,'views'));
app.use(express.static(path.join(__dirname,'public')));
app.use('/tweeter', tweeterRouter);

app.listen('3000',()=>{
    console.log('app started up on port 3000');
});


//swagger configurations
var swaggerDefinition = {
    info: {
      title: 'Tweeter service',
      version: '1.0.0',
      description: 'POC project for a REST API using node.js along with Swagger implementation.',
    },
    host: 'localhost:3000',
    basePath: '/tweeter',
};
  
// options for the swagger docs
var options = {
    swaggerDefinition: swaggerDefinition,
    apis: ['./routes.js'],
};
  
// initialize swagger-jsdoc
var swaggerDocument = swaggerJSDoc(options);

// serve swagger
app.get('/swagger.json', function(req, res) {
    res.setHeader('Content-Type', 'application/json');
    res.send(swaggerDocument);
});

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
    app.use(function(err, req, res, next) {
      res.status( err.code || 500 )
      .json({
        status: 'error',
        message: err
      });
    });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
    res.status(err.status || 500)
    .json({
        status: 'error',
        message: err.message
    });
});
