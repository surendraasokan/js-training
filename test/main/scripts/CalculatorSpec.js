/**
 * Created by sasokan on 2/10/2017.
 */

describe('calculator', function () {

    beforeEach(module('calculatorApp'));

    var $controller,$scope = {};

    beforeEach(inject(function(_$controller_){
        $controller = _$controller_;
        $controller('CalculatorController', { $scope: $scope });
    }));

    describe('sum', function () {
        it('1 + 1 should equal 2', function () {
            //var $scope = {};
            //var controller =
            $scope.x = 1;
            $scope.y = 2;
            $scope.sum();
            expect($scope).toBeDefined();
            expect($scope.z).toBe(3);
        });
    });

});
