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
    
  }).
  controller('MyCtrl2', function ($scope) {
    // write Ctrl here

  });
