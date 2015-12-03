angular.module('starter.controllers', [])

.controller('IndexCtrl', function($ionicPlatform, $scope, $timeout) {

    $ionicPlatform.ready(function() {

        var onSuccess = function () {
            try {
                $scope.time = position.timestamp;
            } catch (err) {
                onError();
            }
            $scope.$apply();
        };

        var onError = function () {
            $scope.time = 'Cannot retrieve timestamp';
            $scope.$apply();
        };

        navigator.geolocation.getCurrentPosition(onSuccess, onError, {enableHighAccuracy: true});
    });
});
