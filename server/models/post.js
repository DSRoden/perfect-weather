'use strict';

var bcrypt = require('bcrypt'),
    Mongo  = require('mongodb'),
    User    = require('./user');

function Post(o){
  this.content = o.content;
  this.poster = o.poster;
  this.totalLikes = o.totalLikes;
  this.weather = o.weather;
  this.originalLoc = o.loc;
  this.timeStamp = new Date();
}

Object.defineProperty(Post, 'collection', {
  get: function(){return global.mongodb.collection('posts');}
});

Post.getAllByLocation = function(location, cb){
  Post.collection.find({homeLoc: {$near: {$geometry: {type: 'Point', coordinates : [location.lon, location.lat]}, $maxDistance : location.distance}}})
    .toArray(function(nearByPosts){
      console.log('nearby posts', nearByPosts);
      cb(nearByPosts);
  })
};

Post.getAllByWeather = function(weather, cb){
};

Post.getAll = function(cb){
  Post.collection.find().toArray(function(posts){
    console.log('all posts', posts);
    cb(posts);
  });
};

Post.getByTimeOrder = function(order, cb){
  Post.collection.aggregate([{$sort : {timeStamp: 1}}]).toArray(function(posts){
    console.log('posts ordered by time', posts);
    cb(posts);
  });
};

Post.findById = function(id, cb){
  var _id = Mongo.ObjectID(id);
  Post.collection.findOne({_id:_id}, cb);
};

Post.createOne = function(postObj, cb){
  console.log('postObj in model', postObj);
  var newPost = new Post(postObj);
  Post.collection.save(newPost, cb);
};

Post.deleteOne = function(postObj, cb){
  var id = Mongo.ObjectID(postObj.id);
  Post.collection.findOne({_id: id}, function(err, post){
    if(err){
      console.log('error finding post', err);
      cb(null);
    }
    if(post.poster === postObj.owner){
      Post.collection.remove({_id: id}, function(response){
        console.log('delete post response', response);
        cb(true);
      });
    } else {
      console.log('not the owner response');
      cb(null);
    }
  });
};

Post.update = function(postObj, cb){
  var id = Mongo.ObjectID(postObj.id);
  Post.collection.findOne({_id: id}, function(err, post){
    if(err){
      console.log('error finding post', err);
      cb(null);
    }
    if(post.poster === postObj.owner){
      Post.collection.update({_id: id}, {$set: {content: content}}, function(response){
        console.log('updated post response', response);
        cb(true);
      })
    } else {
      console.log('error in updating post');
    }
  });
};

Post.getAllByUser = function(postObj, cb){
  Post.collection.find({poster: postObj.owner}).toArray(function(posts){
    console.log('posts by user>>>>', posts);
    cb(posts);
  });
;}



module.exports = Post;
