/**
 * Created by sasokan on 2/8/2017.
 */
(function (ng) {
    var app = ng.module('gMapApp',[]);

    app.controller('appCtrl',['$scope', function ($scope) {
        $scope.displayMap = function() {
            alert($scope.location);
        };
    }]);

})(angular);
