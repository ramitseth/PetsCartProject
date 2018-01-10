var MyApp = angular.module('MyApp', ['ui.router'])
    .run(function ($rootScope) {
        $rootScope.activeItem = [true, false];
    });