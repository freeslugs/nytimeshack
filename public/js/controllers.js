'use strict';

/* Controllers */

angular.module('myApp.controllers', []).
  controller('AppCtrl', function ($scope, $http) {
    
  }).
  controller('MyCtrl1', function ($scope, $http) {
    //while(!$scope.people) {$scope.loading = true;}
    
    $scope.states = ['', 'AL', 'AK', 'AZ', 'AR', 'CA', 'CO', 'CT', 'DE', 'DC', 'FM', 'FL', 'GA', 'HI', 'ID', 'IL', 'IN', 'IA', 'KS', 'KY', 'LA', 'ME', 'MH', 'MD', 'MA', 'MI', 'MN', 'MS', 'MO', 'MT', 'NE', 'NV', 'NH', 'NJ', 'NM', 'NY', 'NC', 'ND', 'OH', 'OK', 'OR', 'PW', 'PA', 'RI', 'SC', 'SD', 'TN', 'TX', 'UT', 'VT', 'VA', 'WA', 'WV', 'WI', 'WY'];

    $scope.message = '';

    $scope.search = {
      'gender': '',
      'chamber': '',
      'party': '',
      'states': $scope.states[0].value
    }

    $scope.submit = function() { 
      /*var param = {};
      for(var property in $scope.search) {
        param[property] = $scope.search[property];
      }*/
      $scope.people = [];
      $scope.loading = true;
      console.log('submit');
      $http({
        method: 'GET',
        url: '/members',
        params: $scope.search
      }).
      success(function (data, status, headers, config) {
        $scope.people = data;
        console.log($scope.people);
        $scope.loading = false;
      }).
      error(function (data, status, headers, config) {
        $scope.people = 'Error!'
      });
    };

    /*$scope.selectedPeople = [];
    $scope.selectPerson = function(index) {
      $scope.selectedPeople.push($scope.people[index]);
    }*/
    //this is the function to post tweet*/
    /*$scope.testTwitterHandle = function(message, twitterhandle) {
      console.log(twitterhandle);
    }*/

    $scope.posttweet = function(message, twitterhandle) {
      $scope.selectedPeople = [];
      $scope.twitterhandles = "";
      if (twitterhandle) {
        $scope.selectedPeople.push(twitterhandle);
      } else {
        $scope.selectedPeople = $scope.people;
      }
      //console.log('total length ' + $scope.selectedPeople.length);
      for (var i = $scope.selectedPeople.length - 1; i >= 0; i--) {
        //console.log($scope.selectedPeople);
        if($scope.selectedPeople[i].twitter_id) {
          $scope.twitterhandles += $scope.selectedPeople[i].twitter_id + ","; 
        }
      };
      $http({
        method: 'POST',
        //headers: {'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'},
        //data: xsrf,
        url: "/posttweet?message=" + message + "&twitterhandles=" + $scope.twitterhandles
        //above you put the message
      }).
      success(function (data, status, headers, config) {
        console.log('sent!');
        $scope.message = '';
      }).
      error(function (data, status, headers, config) {
        console.log('not good');
      });

  /*  $scope.image_url = function() {

      $http({
        method: 'GET',
        url: 
      })

    }*/
    };
    
  }).
  controller('MyCtrl2', function ($scope) {
    // write Ctrl here

  });
