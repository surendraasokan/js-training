//"use strict";
var map;
function initMap() {
    //alert("My gMap - location : " + (document.getElementById('location').value).toString());
    map = new google.maps.Map(document.getElementById('map'), {
    center: {lat: -34.397, lng: 150.644},
    zoom: 8
    });
}

function getMap(result) {
    document.getElementById('latitude').value = result.geometry.location.lat();
    document.getElementById('longitude').value = result.geometry.location.lng();
    var mapProp= {
    center:new google.maps.LatLng(result.geometry.location.lat(),result.geometry.location.lng()),
    zoom:8,
    };
    var map=new google.maps.Map(document.getElementById("googleMap"),mapProp);
    
}

function getLatitudeLongitude(callback, address) {
    // If adress is not supplied, use default value 'Ferrol, Galicia, Spain'
    address = address || 'Ferrol, Galicia, Spain';
    // Initialize the Geocoder
    geocoder = new google.maps.Geocoder();
    if (geocoder) {
        geocoder.geocode({
            'address': address
        }, function (results, status) {
            if (status == google.maps.GeocoderStatus.OK) {
                callback(results[0]);
            }
        });
    }
}

function displayMap() {
    //alert("Hi");
    var address = document.getElementById('location').value;
    getLatitudeLongitude(getMap, address);
}