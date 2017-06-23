"use strict";

var LocationClass = function (address) {
    this.getLatitudeLongitude = function (callback) {  
        var location;
        var geocoder = new google.maps.Geocoder();
        if (geocoder) {
            geocoder.geocode({
                'address': address
            }, function (results, status) {
                if (status == google.maps.GeocoderStatus.OK) {    
                    //location = results[0].geometry.location;
                    callback(results[0]);
                }
            });
        }
        //alert(""+location.lat());
    };
    
    this.getMap = function (result) {  
        var lat = result.geometry.location.lat();
        var long = result.geometry.location.lng();
        (function () {
            document.getElementById('latitude').value = lat;
            document.getElementById('longitude').value = long;
        })();
        var mapProp= {
        center:new google.maps.LatLng(lat,long),
        zoom:10
        };
        var map=new google.maps.Map(document.getElementById("googleMap"),mapProp);
    } ;
    
};

function displayMap() {
    //alert("Hi");    
    var address = document.getElementById('location').value;
    var locationObj = new LocationClass(address);
    var posAttr = locationObj.getLatitudeLongitude(locationObj.getMap);    
}