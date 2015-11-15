'use strict';

var User            = require('./user'),
    request         = require('request'),
    config          = require('../../config');


function Api(){
}

Api.getWeather = function(location, cb){
  var lat = location.lat,
      lon = location.lon,
      city = location.city,
      apiKey = config.weather.apiKey,
      requestString = '';
  //create request string
  if(city){
    requestString = 'http://api.worldweatheronline.com/free/v2/weather.ashx?q=' + city + '&format=json&num_of_days=5&key=' + apiKey;
  } else if(lat && lon){
    requestString = 'http://api.worldweatheronline.com/free/v2/weather.ashx?q='+ lat +'%2C' + lon + '&format=json&num_of_days=5&key=' + apiKey;
  }
  request(requestString, function (error, response, body) {
    if (!error && response.statusCode == 200) {
      body = JSON.parse(body);
      var feelsLikeF = body.data.current_condition[0].FeelsLikeF;
      var weatherObj = {feelsLikeF: feelsLikeF};
      cb(weatherObj);
    } else {
      console.log('err', error);
      cb(error);
    }
  });
};

Api.getCity = function(coordinates, cb){
  var lat = coordinates.lat,
      lon = coordinates.lon,
      apiKey = config.weather.apiKey,
      requestString = 'http://api.worldweatheronline.com/free/v2/search.ashx?q=' + lat + '%2C' + lon + '&format=json&key=' + apiKey;
  request(requestString, function (error, response, body) {
    if(!error && response.statusCode == 200){
      body = JSON.parse(body);
      var area = body.search_api.result[0].areaName[0].value
      cb(area);
    } else {
      console.log('err', error);
      cb(error);
    }
  });
}


//TESTING API
// Api.getWeather({city: 'Cupertino'}, function(weather){
//   console.log('get weather response', weather);

// });

// Api.getCity({lat: 37.3323314100000019, lon: -122.0312186000000025}, function(weather){
//   console.log('get weather response', weather);
// });

module.exports = Api;

