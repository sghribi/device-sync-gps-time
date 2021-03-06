angular.module('starter.controllers', [])

.controller('IndexCtrl', function($ionicPlatform, $scope, $timeout, $interval) {

    $scope.updates = 0;
    $scope.nbSecBetweenFlash = 5;
    $scope.style= 'black';

    $scope.update = function() {
        var onSuccess = function (position) {
            var dateLocale = new Date();
            $scope.timeLocale = moment(dateLocale).format('MMMM Do YYYY, HH:mm:ss.SSSSSS');
            $scope.timeGPS = moment(position.timestamp).format('MMMM Do YYYY, HH:mm:ss.SSSSSS');
            $scope.diff = moment(moment(dateLocale).diff(moment(position.timestamp))).format('SSS [ms]');
            $scope.updates++;

            var microseconds = parseInt(moment(position.timestamp).format('sSSSSSS'));

            var nbSecBetweenFlash = $scope.nbSecBetweenFlash;

            microsecondsNext = microseconds - microseconds%(nbSecBetweenFlash*1000000) + nbSecBetweenFlash*1000000;
            var delay = (microsecondsNext-microseconds)/1000;

            $scope.nextFlash = moment(position.timestamp).add(delay, 'milliseconds').format('HH[h]mm[min] ss.SS0');
            $scope.$apply();

            // Caca
            $timeout(function() {
                navigator.vibrate([100]);
                $scope.color = 'red';
                $timeout(function() {
                    $scope.color = 'orange';
                    $timeout(function() {
                        $scope.color = 'yellow';
                        $timeout(function() {
                            $scope.color = 'green';
                            $timeout(function() {
                                $scope.color = 'blue';
                                $timeout(function() {
                                    $scope.color = 'purple';
                                    $timeout(function() {
                                        $scope.color = 'black';
                                    }, 100);
                                }, 100);
                            }, 100);
                        }, 100);
                    }, 100);
                }, 100);

                $scope.update();
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

    $interval(function() {
        $scope.approximateTime = moment().format('HH:mm:ss');
    }, 1);
});
