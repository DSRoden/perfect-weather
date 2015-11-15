'use strict'

var User = require('../models/user'),
	Api = require('../models/api');

exports.getWeather = function(req, res){
  User.findByEmail(req.body.email, function(user){
  	console.log('user', user);
    if(user.homeCity){
        Api.getWeather({city: user.homeCity}, function(weather){
        	console.log('response from controller getUserCoorWeather>>>>', weather);
        	res.send(weather);
        });
    }else{
      res.status(401).end();
    }
  });
};