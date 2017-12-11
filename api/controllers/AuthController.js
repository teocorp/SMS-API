// AuthController.js
var bcrypt = require('bcryptjs');
var jwt = require('jsonwebtoken'); // used to create, sign, and verify tokens
var config = require('../../config');
var User = require('../models/User');


exports.register = function (req, res) {
  var hashedPassword = bcrypt.hashSync(req.body.password, 8);

  User.create({
      name: req.body.name,
      email: req.body.email,
      password: hashedPassword,
      admin: false
    },
    function (err, user) {
      if (err) return res.status(500).send("There was a problem registering the user.")
      // create a token
      var token = jwt.sign({
        id: user._id
      }, config.secret, {
        expiresIn: 86400 // expires in 24 hours
      });
      //   res.status(200).send({ success: true, token: token });
      res.json({
        success: true
      });
    });
}


exports.getMe = function (req, res) {
  var token = req.headers['x-access-token'];
  if (!token) return res.status(401).send({
    auth: false,
    message: 'No token provided.'
  });

  jwt.verify(token, config.secret, function (err, decoded) {
    if (err) return res.status(500).send({
      auth: false,
      message: 'Failed to authenticate token.'
    });

    res.status(200).send(decoded);
  });
}

exports.setup = function (req, res) {
  // create a sample user
  var nick = new User({
    name: 'CanCC',
    email: 'cancc@gmail.com',
    password: 'password',
    admin: true,
  });

  nick.save(function (err) {
    if (err) throw err;

    console.log('User saved successfully');
    res.json({
      success: true
    });
  });
};

exports.authenticate = function (req, res) {
  // find the user
  User.findOne({
    name: req.body.name
  }, function (err, user) {

    if (err) throw err;

    if (!user) {
      res.json({
        success: false,
        message: 'Authentication failed!'
      });
    } else if (user) {
      // check if password matches
      if (!bcrypt.compareSync(req.body.password, user.password)) {
        res.json({
          success: false,
          message: 'Authentication failed!'
        });
      } else {

        // if user is found and password is right
        // create a token
        var payload = {
          admin: user.admin
        }
        var token = jwt.sign(payload, config.secret, {
          expiresIn: 86400 // expires in 24 hours
        });

        res.json({
          success: true,
          message: 'Enjoy your token!',
          token: token
        });
      }

    }

  });
}