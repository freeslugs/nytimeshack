'use strict';

/* Controllers */

angular.module('myApp.controllers', []).
  controller('AppCtrl', function ($scope, $http) {
    $http({
      method: 'GET',
      url: '/members?party=d'
    }).
    success(function (data, status, headers, config) {
      $scope.people = data;
      console.log($scope.people);
    }).
    error(function (data, status, headers, config) {
      $scope.people = 'Error!'
    });

  }).
  controller('MyCtrl1', function ($scope) {
    // write Ctrl here

  }).
  controller('MyCtrl2', function ($scope) {
    // write Ctrl here

  });
