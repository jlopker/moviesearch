'use strict';

angular.module('moviesearchApp')
.controller('MainCtrl', function ($scope, $http) {

    $scope.fetch = function(){
        $http.get('http://www.omdbapi.com/?t=' + $scope.search + '&plot=short&r=json')
            .success(function(data){
                $scope.details = data;
        });
    };

    if($scope.search === undefined){
        $scope.search = 'Mad Max: Fury Road';
        $scope.fetch();
    }

    var pendingTask;

    $scope.change = function(){
        if(pendingTask) {
            clearTimeout(pendingTask);
        }
        pendingTask = setTimeout($scope.fetch, 800);
        $scope.showThanks = false;
    };

    $scope.update = function(movie){
        $scope.search = movie.Title;
        $scope.change();
    };

    $scope.user = {};

    $scope.showThanks = false;

    $scope.sendInfo = function() {
        $scope.user.results = $scope.details;
        $http.post('/api/sendinfo', $scope.user).success(function() {
            $scope.showThanks = true;
        })
    };

});
