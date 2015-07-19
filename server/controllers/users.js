'use strict';

var User = require('../models/user'),
    sess;

exports.status = function(req, res){
  sess= req.session;
  if(sess.email){
  res.send(sess.email);
  } else {
    res.send('not logged in');
  }
};

exports.register = function(req, res){
  User.register(req.body, function(err, user){
    if(user){
      res.status(200).end();
    }else{
      res.status(400).end();
    }
  });
};

exports.login = function(req, res){
  sess= req.session;
  User.login(req.body, function(err, user){
    if(user){
        sess.email = user.email;
        res.send({email: user.email}).end();
    }else{
      res.status(401).end();
    }
  });
};

exports.logout = function(req, res){
  sess=req.session;
  sess.destroy(function(){
    res.status(200).end();
  });
};

