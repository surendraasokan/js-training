/**
 * Created by sasokan on 2/9/2017.
 */
describe('Test App Angular', function() {
    'use strict';

    describe('Controller:appCtrl', function () {

        beforeEach(module('gMapApp'));

        var scope, appCtrlr;

       beforeEach(function () {
          inject(function ($rootScope, $controller) {
              scope = $rootScope.$new();

              appCtrlr = $controller('appCtrl', {
                  $scope : scope
              });
          });
           spyOn(scope, '$emit');

       });

        it('Should have certain fields', function () {
            expect(scope.location).toBeDefined();
            expect(scope.latitude).toBeDefined();
            expect(scope.longitude).toBeDefined();
        });
    });
});