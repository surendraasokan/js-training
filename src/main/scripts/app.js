/**
 * Created by sasokan on 2/8/2017.
 */
(function (ng) {
    ng.module('GMapApp',['gMapModule', 'ui.bootstrap'])

    .controller('appCtrl',['$scope', function ($scope) {

        $scope.namesArr = ["suren","abi","adhava","adhira","pilot"];

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
                localStorage.locationObj =  '{'+
                   ' "latitude" : "'+ $scope.latitude + '",' +
                   '"longitude" : "'+ $scope.longitude + '"' +'}';
            });
        };

        $scope.getBack = function() {
          if(localStorage.locationObj) {
              var locObj = JSON.parse(localStorage.locationObj);
              alert("latitude : "+ locObj.latitude + "\n" +
                    "longitude :"+ locObj.longitude);
          } else {
              alert("There are no values available");
          }
        };

        $scope.displayMap = function() {
            var address = $scope.location;
            $scope.getLatitudeLongitude($scope.getMap,address);
        };
    }]);

})(angular);
