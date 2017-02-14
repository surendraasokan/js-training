/**
 * Created by sasokan on 2/13/2017.
 */
(function (ng) {
    var reLoadApp = ng.module('ReLoad',['ngAnimate','ngSanitize','ui.bootstrap','ui.router']);

    reLoadApp.controller('reLoadCtrl',['$scope', function ($scope) {
        $scope.totalItems = 64;
        $scope.currentPage = 4;
        $scope.onLoad = function() {
            if (localStorage.locationObj) {
                var locObj = JSON.parse(localStorage.locationObj);
                $scope.latitude = locObj.latitude;
                $scope.longitude = locObj.longitude;
            } else {
                alert("There are no values available");
            }
        };
    }]);

    reLoadApp.config(['$stateProvider','$urlRouterProvider', function ($stateProvider, $urlRouterProvider) {
       // $urlRouterProvider.when('','/');

        $stateProvider.state('home', {
            url: '/',
            template: 'Hello {{name}}',
            controller: ['$scope', function ($scope) {
                $scope.name = "World";
            }]
        });
    }]);
})(angular);