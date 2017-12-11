var jwt = require('jsonwebtoken'); // used to create, sign, and verify tokens
var config = require('./config'); // get our config file
var morgan = require('morgan');
var cors = require('cors');

var express = require('express'),
  app = express(),
  port = process.env.PORT || 3000;
app.set('superSecret', config.secret);
// use morgan to log requests to the console
app.use(morgan('dev'));

mongoose = require('mongoose'),
  Task = require('./api/models/todoListModel'), //created model loading here
  // mongoose instance connection url connection
  mongoose.Promise = global.Promise;
mongoose.connect(config.database, {
  useMongoClient: true,
});

bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({
  extended: true
}));
app.use(bodyParser.json());
// app.use(function(req, res) {
//   res.status(404).send({url: req.originalUrl + ' not found'})
// });


var apiRoutes = express.Router();
// ---------------------------------------------------------
// route middleware to authenticate and check token
// ---------------------------------------------------------
apiRoutes.use(function (req, res, next) {
  
  // check header or url parameters or post parameters for token
  var token = req.body.token || req.params.token || req.headers['x-access-token'];

  // decode token
  if (token) {

    // verifies secret and checks exp
    jwt.verify(token, app.get('superSecret'), function (err, decoded) {
      if (err) {
        return res.json({
          error: true,
          message: 'Failed to authenticate token.'
        });
      } else {
        // if everything is good, save to request for use in other routes
        req.decoded = decoded;
        next();
      }
    });

  } else {

    // if there is no token
    // return an error
    return res.status(403).send({
      error: true,
      message: 'No token provided.'
    });

  }

});


const corsOptions = {
  origin: '*'
}
app.use(cors(corsOptions));
// apply the routes to our application with the prefix /api
app.use('/api', apiRoutes);
var routes = require('./api/routes/routes'); //importing route
routes(app); //register the route

app.listen(port);

console.log('todo list RESTful API server started on: ' + port);