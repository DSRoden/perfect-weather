'use strict';

var morgan         = require('morgan'),
    bodyParser     = require('body-parser'),
    methodOverride = require('express-method-override'),
    session        = require('express-session'),
    security       = require('../lib/security'),
    debug          = require('../lib/debug'),
    users          = require('../controllers/users'),
    apis           = require('../controllers/apis'),
    passport       = require('passport'),
    passportConfig = require('../lib/passport/config');

module.exports = function(app, express){
  app.use(morgan('dev'));
  app.use(express.static(__dirname + '/../../public'));
  app.use(bodyParser.urlencoded({extended:true}));
  app.use(bodyParser.json());
  app.use(methodOverride());
  passportConfig(passport, app);

  app.use(session({secret: 'ssshhhhh'}));

  app.use(debug.info);
  app.post('/register', users.register);
  app.get('/status', users.status);
  app.post('/login', users.login);

  // oauth routes
  app.get('/auth/facebook', passport.authenticate('facebook', {scope: ['public_profile', 'email', 'user_friends', 'user_photos']}));
  app.get('/auth/facebook/callback', function(req, res, next){
    passport.authenticate('facebook', function(err, user, info){
      if(err){
        return next(err); // will generate a 500 error
      }
      // Generate a JSON response reflecting signup
      if(!user){
        return res.send({success : false, message : 'signupfailed'});
      }
      console.log('user', user);
      req.session.email = user.email;
      return res.redirect('/#/thanks/' + user.email);
    })(req, res, next);
  });

  app.get('/auth/twitter', passport.authenticate('twitter'));
  app.get('/auth/twitter/callback', function(req, res, next){
    passport.authenticate('twitter', function(err, user, info){
      if(err){
        return next(err); // will generate a 500 error
      }
      // Generate a JSON response reflecting signup
      if(! user){
        return res.send({success : false, message : 'signupfailed'});
      }
      // req.session.email = user.email;
      console.log('user', user);
      return res.redirect('/#/thanks/' + user.email);
    })(req, res, next);
  });

  app.get('/auth/google', passport.authenticate('google',  {scope: ['https://www.googleapis.com/auth/plus.login', 'https://www.googleapis.com/auth/plus.profile.emails.read']}));
  app.get('/auth/google/callback', function(req, res, next){
    passport.authenticate('google', function(err, user, info){
      if(err){
        return next(err); // will generate a 500 error
      }
      // Generate a JSON response reflecting signup
      if(! user){
        return res.send({success : false, message : 'signupfailed'});
      }
      req.session.email = user.email;
      return res.redirect('/#/thanks');
    })(req, res, next);
  });

  app.use(security.bounce);
  app.post('/saveUserLocCoor', users.saveLocationCoor);
  app.post('/getWeather', apis.getWeather);
  app.get('/logout', users.logout);
  //console.log('Express: Routes Loaded');
};

