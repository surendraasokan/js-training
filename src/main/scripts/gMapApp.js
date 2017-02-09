"use strict";

var LocationClass = function (address) {
    this.getLatitudeLongitude = function () {
        var location;
        var geocoder = new google.maps.Geocoder();
        if (geocoder) {
            geocoder.geocode({
                'address': address
            }, function callBackInnerFn(results, status) {
                if (status == google.maps.GeocoderStatus.OK) {
                    location = results[0].geometry.location;
                    document.getElementById('latitude').value = location.lat();
                    document.getElementById('longitude').value = location.lng();
                    //callback(results[0]);
                }
            });
            return true;
        }
        return false;
    }
    
    this.getMap = function (lat,long) {

        var mapProp= {
        center:new google.maps.LatLng(lat,long),
        zoom:10,
        };
        var map=new google.maps.Map(document.getElementById("googleMap"),mapProp);
    }
    
}

function displayMap() {
    //alert("Hi");    
    var address = document.getElementById('location').value;
    var locationObj = new LocationClass(address);
    if(locationObj.getLatitudeLongitude()) {
        var lat = document.getElementById('latitude').value;
        var long = document.getElementById('longitude').value;
        locationObj.getMap(lat,long);
    }
}