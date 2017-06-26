/**
 * Created by sasokan on 2/9/2017.
 */
describe('Test App Angular', function() {
    //'use strict';

    var mockGMapModule, rootScope,$controller,$scope = {};

   /* beforeEach(function() {
        module(function($provide) {
            $provide.value('gMapModule', mockGMapModule);
        });
    });*/

    beforeEach(module('gMapModule'));
    beforeEach(module('GMapApp'));

    beforeEach(function() {
        inject(function ($rootScope,_$controller_) {
            rootScope = $rootScope;
            $scope = rootScope.$new();

            $controller = _$controller_;
            $controller('appCtrl', { $scope : $scope });
        });
        spyOn($scope, '$emit');
    });

    describe('Controller:appCtrl', function () {

       it('Should have certain fields', function () {
            expect($scope).toBeDefined();
            //expect(scope.latitude).toBeDefined();
            //expect(scope.longitude).toBeDefined();
        });

       it('should test display map', function () {
           $scope.displayMap();
           expect($scope.displayMap).toBeDefined();
       });

       it('should test getLatitudeLongitude', function () {
           var lat = 0, long;
           var location = "Chennai";

           /*var getMap = function (loc) {
               lat = loc.lat();
               long = loc.lng();
           };*/

           var callbackSpy = jasmine.createSpy("callback").and.callFake(function(loc) {

           });

           /*spyOn($scope,'getMap').and.callFake(function (loc) {
               $scope.latitude = loc.lat();
               $scope.longitude = loc.lng();
           });*/

           //$scope.getMap(loc);

           //expect($scope.getMap).toHaveBeenCalled();
           $scope.getLatitudeLongitude(callbackSpy, location);

           expect(callbackSpy).toHaveBeenCalled();

           //expect($scope.latitude).toEqual(13.0826802);
           expect($scope.getLatitudeLongitude).toBeTruthy();
       });

       it('should test get Map', function() {
          var loc = {
             lat : function() {
                 return "13.005"
                } ,
              lng : function () {
                  return "20.005"
              }
          };
          $scope.getMap(loc);
          expect($scope.latitude).toBe("13.005");
          expect($scope.longitude).toBe("20.005");
       });
    });
});