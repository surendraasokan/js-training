/**
 * Created by sasokan on 2/9/2017.
 */
describe('Test App Angular', function() {
    //'use strict';

    var mockGMapModule, rootScope,$controller,$q, scope = {};
    var geocoder;

    beforeEach(function(){
        module('gMapModule');
    });
    beforeEach(function() {
        module('GMapApp');
    });

    beforeEach(function() {
        inject(function ($rootScope,_$controller_,$injector) {
            rootScope = $rootScope;
            rootScope.$digest();
            scope = rootScope.$new();
            $q = $injector.get('$q');

            $controller = _$controller_;
            $controller('appCtrl', {
                $scope : scope,
                location : 'Chennai',
                latitude : '0',
                longitude : '0'
            });
        });
        spyOn(scope, '$emit');
        var constructorSpy = spyOn(google.maps, 'Geocoder');
        geocoder = jasmine.createSpyObj('Geocoder', ['geocode']);
        constructorSpy.and.returnValue(geocoder);
    });

    describe('Controller:appCtrl', function () {

       it('Should have certain fields', function () {
            expect(scope).toBeDefined();
            //expect(scope.latitude).toBeDefined();
            //expect(scope.longitude).toBeDefined();
        });

       it('should test display map', function () {
           var location = "Chennai";
           spyOn(scope,'getMap').and.callFake(function(loc){});

           scope.displayMap();

           expect(scope.getMap).toHaveBeenCalledWith(scope.location);
           expect(scope.displayMap).toBeDefined();

       });

       it('should test getLatitudeLongitude', function () {
           var location = "Chennai";
           var resultsArr = [{geometry: {location: {
               lat: function() { return 13.005;},
               lng: function() { return 20.005;}
           }}}];
           geocoder.geocode.and.callFake(function(request, callback) {
               callback(resultsArr, google.maps.GeocoderStatus.OK);
           });

           // Act
           var result = scope.getLatitudeLongitude(location);

           // Assert
           expect(geocoder.geocode).toHaveBeenCalled();
           var lastCall = geocoder.geocode.calls.mostRecent();
           var args = lastCall.args[0];
           expect(args.address).toEqual(location);

           geocoder.geocode.and.callFake(function(request, callback) {
               callback([], google.maps.GeocoderStatus.ZERO);
           });
       });

       it('should test get Map', function() {
          var location = "Chennai";
          var loc = {
             lat : function() {
                 return "13.005"
                } ,
              lng : function () {
                  return "20.005"
              }
          };
           spyOn(scope,'getLatitudeLongitude').and.callFake(function(location){
               var deferred = $q.defer();
               deferred.resolve(loc);
               return deferred.promise;
           });
          scope.getMap(location);
           expect(scope.getLatitudeLongitude).toHaveBeenCalledWith(location);
           rootScope.$apply();
          expect(scope.latitude).toBe("13.005");
          expect(scope.longitude).toBe("20.005");
       });
    });
});