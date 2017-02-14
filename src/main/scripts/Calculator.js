/**
 * Created by sasokan on 2/10/2017.
 */
(function (ng) {
    var app = ng.module('calculatorApp', []);

// Registers a controller to our module 'calculatorApp'.
    app.controller('CalculatorController', ['$scope',function ($scope) {
        $scope.z = 0;
        $scope.sum = function() {
            $scope.z = $scope.x + $scope.y;
        };
    }]);

// load the app
    ng.element(document).ready(function() {
        ng.bootstrap(document, ['calculatorApp']);
    });
})(angular);

