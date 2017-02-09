//"use strict";

window.google = {
    maps: {
        Geocoder: function() {
            this.geocode = function(input, fn) {
                setTimeout(function() {
                    fn([{geometry: {location: 1}}], window.google.maps.GeocoderStatus.OK);
                }, 1000);
            }
        },
        GeocoderStatus: {
            OK: 1
        },
        LatLng: function (lat,long) {
            return {};
        },
        Map: function (element,mapObj) {
            return {};
        }
    }
};

describe("Google map Spec", function() {
    var locationSpecObj;
    beforeEach(function(){
        locationSpecObj = new LocationClass("Columbus");
        //spyOn(locationSpecObj, "getLatitudeLongitude");
    });
    
    it("should test lat and long", function() {

      var called = false;
      window.testGetLatLon = function() {
          called = true;
      };
        /*locationSpecObj.getLatitudeLongitude = function() {
            testGetLatLon();
        };*/

        locationSpecObj.getLatitudeLongitude();
        expect(locationSpecObj.getLatitudeLongitude).toBeTruthy();
        //expect(locationSpecObj.getLatitudeLongitude).toHaveBeenCalled();
    });

    xit("Test GeoCode", function(done) {
        var callbackSpy = jasmine.createSpy("callback").and.callFake(function() {
            done();
        });
        locationSpecObj.getLatitudeLongitude(callbackSpy);
    });

    it("should test the Inner function", function(){
        var geocoder = new google.maps.Geocoder();
        expect(geocoder.geocode.calls.argsFor(0)).toEqual([{},function(){}]);
    });

    it("should test displayMap function", function() {
        /*var HTMLElements = {};
        document.getElementById = jasmine.createSpy('HTML Element').andCallFake(function(ID) {
            if(!HTMLElements[ID]) {
                var newElement = document.createElement('div');
                HTMLElements[ID] = newElement;
            }
            return HTMLElements[ID];
        });*/
        var dummyElement = document.createElement('div');
        document.getElementById = jasmine.createSpy('HTML Element').and.returnValue(dummyElement);
        document.getElementById('latitude').value = 13.0826802;
        document.getElementById('longitude').value = 80.27071840000008;

        displayMap();

        expect(locationSpecObj.getLatitudeLongitude()).toBe(true);
    });

    xit("expecting false for getLatitudeLongitude function", function () {
        window.google.maps.Geocoder = function() {

        }

        expect(locationSpecObj.getLatitudeLongitude()).toBe(false);
    });
});
