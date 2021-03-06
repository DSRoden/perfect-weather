'use strict';

var config = {};

config.twitter = {
   apiKey : process.env.TWITTER_ID,
   apiSec : process.env.TWITTER_SECRET,
   callbackURL : 'http://localhost:3333/auth/twitter/callback'
 };

config.facebook = {
  //models of models id
  clientId : process.env.WEATHER_FACEBOOK_ID,
  clientSecret : process.env.WEATHER_FACEBOOK_SECRET,
  callbackURL : 'http://localhost:3333/auth/facebook/callback'
};

config.google = {
  clientId : process.env.GOOGLE_ID,
  clientSecret : process.env.GOOGLE_SECRET,
  callbackURL : 'http://localhost:3333/auth/google/callback'
};

config.weather = {
  apiKey : process.env.WORLD_WEATHER
}

module.exports = config;