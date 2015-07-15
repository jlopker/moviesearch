'use strict';

angular.module('moviesearchApp')
.controller('IdCtrl', function ($scope, $http) {

    $scope.fetch = function(){
        $http.get('http://www.omdbapi.com/?i=' + $scope.id + '&plot=short&r=json')
            .success(function(data){
                $scope.details = data;
        });

    }
    
    if($scope.id === undefined){
        $scope.id = 'tt1392190';
        $scope.fetch();
    }

    var pendingTask;

    $scope.change = function(){
        if(pendingTask) {
            clearTimeout(pendingTask);
        }
        pendingTask = setTimeout($scope.fetch, 800);
    };

    $scope.update = function(movie){
        $scope.id = movie.Title;
        $scope.change();
    };

});
