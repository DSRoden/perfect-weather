(function(){
  'use strict';
  angular.module('models')
  .controller('ThanksCtrl', ['$scope', '$rootScope', '$stateParams', '$timeout', '$famous', '$http', '$localStorage', 'Status', function($scope, $rootScope, $stateParams, $timeout, $famous, $http, $localStorage, Status){
    /************************************* BEGIN SETUP PAGE DIMENSIONS *******************************/
    ////// PAGE DIMENSIONS SETUP //////
    // view width and height variables
    // var pageWidth = window.innerWidth,
    //     pageHeight = window.innerHeight;
    $rootScope.rootuser = {};
    //functions for dynamically accessing window width and height
    $scope.getPageWidth = function(){
      return window.innerWidth;
    };
    $scope.getPageHeight = function(){
      return window.innerHeight;
    };

    $scope.email = $stateParams.email;
    console.log('email', $scope.email);
    window.localStorage.setItem('email', $scope.email);
  }]);
})();
