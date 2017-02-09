/**
 * Created by sasokan on 2/8/2017.
 */
(function (ng) {
    var app = ng.module('gMapApp',['gMapModule']);

    app.controller('appCtrl',['$scope', function ($scope) {

        $scope.getLatitudeLongitude = function (callback, address) {
            var location;
            var geocoder = new google.maps.Geocoder();
            if (geocoder) {
                geocoder.geocode({
                    'address': address
                }, function (results, status) {
                    if (status == google.maps.GeocoderStatus.OK) {
                        location = results[0].geometry.location;
                        callback(location);
                    }
                });
                return true;
            }
            return false;
        };

        $scope.getMap = function (loc) {

            $scope.$apply(function() {
                $scope.latitude = loc.lat() ;
                $scope.longitude = loc.lng();
            });

            /*var mapProp= {
                center:new google.maps.LatLng(loc.lat(),loc.lng()),
                zoom:10,
            };
            var map=new google.maps.Map(document.getElementById("googleMap"),mapProp);*/
        };

        $scope.displayMap = function() {
            //alert($scope.location);

            var address = $scope.location;
            $scope.getLatitudeLongitude($scope.getMap,address);

            /*if($scope.getLatitudeLongitude(address)) {
                $scope.getMap($scope.latitude,$scope.longitude);
            }*/
        };
    }]);

})(angular);
