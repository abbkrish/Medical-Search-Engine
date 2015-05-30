var app = angular.module('app', ['ngResource', 'ngRoute']);

app.config(function ($routeProvider) {
    $routeProvider.when('/addPost', {
        template: 'yurg',
        controller: 'AddCtrl'
    });
});
