'use strict'

var User = require('../models/user'),
	Api = require('../models/api'),
  Post = require('../models/post');

exports.createOne = function(req, res){
  Post.createOne(req.body, function(post){
  	console.log('post response in createOne', post);
    if(post === null){
      res.status(200).end();
    }
  });
};