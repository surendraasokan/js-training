(function(ng){
    'use strict';

    var appDirective = ng.module("gMapModule",[]);

    appDirective.controller('gMapDirectiveCtrl',['$scope', function($scope) {
        $scope.init = function() {
            var mapProp= {
                center:new google.maps.LatLng($scope.lat,$scope.long),
                zoom:10
            };
            var map=new google.maps.Map(document.getElementById("googleMap"),mapProp);
        };

        $scope.$watchGroup(['lat','long'], function (newCol,oldCol) {
            $scope.init();
        });

    }]);

    appDirective.directive('gMap',[function(){
        return {
            restrict : 'EA',
            controller : 'gMapDirectiveCtrl',
            transclude : true,
            scope : {
                lat : '=',
                long : '='
            },
            templateUrl : 'gMap.html'
        }
    }]);
})(angular);