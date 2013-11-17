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
    //while(!$scope.people) {$scope.loading = true;}
    $scope.states = ['', 'AL', 'AK', 'AS', 'AZ', 'AR', 'CA', 'CO', 'CT', 'DE', 'DC', 'FM', 'FL', 'GA', 'GU', 'HI', 'ID', 'IL', 'IN', 'IA', 'KS', 'KY', 'LA', 'ME', 'MH', 'MD', 'MA', 'MI', 'MN', 'MS', 'MO', 'MT', 'NE', 'NV', 'NH', 'NJ', 'NM', 'NY', 'NC', 'ND', 'MP', 'OH', 'OK', 'OR', 'PW', 'PA', 'PR', 'RI', 'SC', 'SD', 'TN', 'TX', 'UT', 'VT', 'VI', 'VA', 'WA', 'WV', 'WI', 'WY'];

    $scope.message = '';
    //this is the function to post tweet
    $scope.posttweet = function(twitterhandle, message) {

      $http({
        method: 'POST',
        url: "/posttweet?message='" + message + "'&twitterhandle='" + twitterhandle + "'"
        //above you put the message
      }).
      success(function (data, status, headers, config) {
        console.log('sent!');
      }).
      error(function (data, status, headers, config) {
        console.log('not good');
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
