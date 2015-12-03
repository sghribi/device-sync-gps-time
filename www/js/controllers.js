angular.module('starter.controllers', [])

.controller('IndexCtrl', function($ionicPlatform, $scope, $timeout) {

    $scope.updates = 0;

    $scope.update = function() {
        var onSuccess = function (position) {
            $scope.timeLocale = new Date().getTime();
            $scope.timeGPS = position.timestamp;
            $scope.diff = $scope.timeLocale - $scope.timeGPS;
            $scope.updates++;
            $scope.$apply();
            $scope.update();
        };

        var onError = function () {
            $scope.timeLocale = new Date().getTime();
            $scope.timeGPS = 'Cannot retrieve timestamp';
            $scope.$apply();
        };

        navigator.geolocation.getCurrentPosition(onSuccess, onError, {enableHighAccuracy: true, maxAge: 200});
    };

    $ionicPlatform.ready(function() {
        $scope.update();
    });
});
