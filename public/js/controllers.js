'use strict';

/* Controllers */

angular.module('myApp.controllers', []).
  controller('AppCtrl', function ($scope, $http, $rootScope) {
    $http({
      method: 'GET',
      url: '/members'
    }).
    success(function (data, status, headers, config) {
      $rootScope.people = data;
      console.log($scope.people);
    }).
    error(function (data, status, headers, config) {
      $rootScope.people = 'Error!'
    });
  }).
  controller('MyCtrl1', function ($scope, $http) {
    // write Ctrl here
    
    //this is the function to post tweet
    $scope.posttweet = function() {

      //make sure to get the twitter handle from the people object

      $http({
        method: 'POST',
        url: '/posttweet?message="I love Israel"'
        //above you put the message
      }).
      success(function (data, status, headers, config) {
        console.log('sent!');
      }).
      error(function (data, status, headers, config) {
        console.log('oh fuck');
      });

    $scope.image_url = function() {

      $http({
        method: 'GET',
        url: 
      })
    }

    }
    
  }).
  controller('MyCtrl2', function ($scope) {
    // write Ctrl here

  });
