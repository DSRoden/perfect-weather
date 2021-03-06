'use strict';

var User = require('../models/user'),
    passport = require('passport'),
    sess;

exports.status = function(req, res){
  sess= req.session;
  // console.log(req);
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

// exports.oauthCallback = function(strategy){
//   return function(req, res, next){
//     passport.authenticate(strategy, function(err, user, redirectURL){
//       if(err || !user){
//         return res.redirect('/#/');
//       }
//       req.login(user, function(err){
//         if (err) {
//           return res.redirect('/#/');
//         }

//         return res.redirect(redirectURL || '/');
//       });
//     })(req, res, next);
//   };
// };

exports.saveLocationCoor = function(req, res){
  console.log('userLocObj', req.body);
  User.saveLocationCoor(req.body, function(response){
    if(response === null){
      res.status(200).end();
    }
  });
}


