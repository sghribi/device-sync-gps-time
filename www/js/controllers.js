angular.module('starter.controllers', [])

.controller('IndexCtrl', function($ionicPlatform, $scope, $timeout) {

    $scope.updates = 0;
    $scope.style= 'black';

    $scope.update = function() {
        var onSuccess = function (position) {
            var dateLocale = new Date();
            $scope.timeLocale = moment(dateLocale).format('MMMM Do YYYY, HH:mm:ss.SSSSSS');
            $scope.timeGPS = moment(position.timestamp).format('MMMM Do YYYY, HH:mm:ss.SSSSSS');
            $scope.diff = moment(moment(dateLocale).diff(moment(position.timestamp))).format('SSS [ms]');
            $scope.updates++;


            var microseconds = parseInt(moment(position.timestamp).format('sSSSSSS'));
            microsecondsNext = microseconds - microseconds%10000000 + 10000000;
            var delay = (microsecondsNext-microseconds)/1000;


            $scope.nextFlash = moment(position.timestamp).add(delay, 'milliseconds').format('HH:mm:ss.SSSSSS');
            console.log("Next flash in " + delay + " ms");
            $scope.$apply();

            $timeout(function() {
                $scope.color = 'white';
                $timeout(function() {
                    $scope.color = 'black';
                }, 100);
            }, delay);
        };

        var onError = function () {
            $scope.timeLocale = new Date().getTime();
            $scope.timeGPS = 'Cannot retrieve timestamp';
            $scope.$apply();
        };

        navigator.geolocation.getCurrentPosition(onSuccess, onError, {enableHighAccuracy: true, maxAge: 200});
    };

    $ionicPlatform.ready(function() {
        window.plugins.insomnia.keepAwake();
        $scope.update();
    });
});
