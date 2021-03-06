'use strict';

// Configure the main application module.
var movieApp = angular.module('movieApp', ['ui.router', 'ui.bootstrap', 'ngCookies'])
    .filter('myFilter', function () {
        return function (items) {
            var dateFrom = new Date(new Date().getTime() + (24 * 60 * 60 * 1000) * 2);
            var arrayToReturn = [];
            for (var i = 0; i < items.length; i++) {
                var showingDate = new Date(items[i].dateTime);
                if (showingDate >= dateFrom) {
                    arrayToReturn.push(items[i]);
                }
            }
            return arrayToReturn;
        }
    })
    
//Filter on current date
    .filter('dateFilter', function () {
        return function (items) {
            var dateFrom = new Date(new Date().getTime());
            var arrayToReturn = [];
            for (var i = 0; i < items.length; i++) {
                var showingDate = new Date(items[i].dateTime);
                if (showingDate >= dateFrom) {
                    arrayToReturn.push(items[i]);
                }
            }
            return arrayToReturn;
        }
    })
    
        //new filter
    .filter('todayFilter', function () {
        return function (items) {
            var dateFrom = new Date(new Date().getTime());
            var dateTo = new Date(new Date().getTime() + (24 * 60 * 60 * 1000));
            var arrayToReturn = [];
            //var today = (dateFrom = new Date(new date())) && (dateFrom = new Date(new date().getMonth())) && (dateFrom = new Date(new date().getMonth().getDay()));
            for (var i = 0; i < items.length; i++) {
                var showingDate = new Date(items[i].dateTime);
                if (showingDate >= dateFrom && showingDate.getDate() == dateFrom.getDate() && showingDate.getMonth() == dateFrom.getMonth() && showingDate.getYear() == dateFrom.getYear())  {
                    arrayToReturn.push(items[i]);
                }
            }
            return arrayToReturn;
        }
    })
    
    /*Constants regarding user login defined here*/
    .constant('USER_ROLES', {
        all: '*',
        admin: 'admin',
        editor: 'editor',
        customer: 'customer',
        guest: 'guest'
    }).constant('AUTH_EVENTS', {
        loginSuccess: 'auth-login-success',
        loginFailed: 'auth-login-failed',
        logoutSuccess: 'auth-logout-success',
        sessionTimeout: 'auth-session-timeout',
        notAuthenticated: 'auth-not-authenticated',
        notAuthorized: 'auth-not-authorized',
        loginRequest: 'auth-login-request'
    })
    /* Adding the auth interceptor here, to check every $http request*/
    .config(function ($httpProvider) {
        $httpProvider.interceptors.push([
            '$injector',
            function ($injector) {
                return $injector.get('AuthInterceptor');
            }
        ]);
    }).config(function ($sceDelegateProvider) {
        $sceDelegateProvider.resourceUrlWhitelist([
            'self',
            '*://www.youtube.com/**'
        ]);
    })
    .run(['$rootScope', '$location', '$cookieStore', '$http',
        function ($rootScope, $location, $cookieStore, $http) {
            // keep user logged in after page refresh
            $rootScope.globals = $cookieStore.get('globals') || {};
            if ($rootScope.globals.currentUser) {
                $http.defaults.headers.common['Authorization'] = 'Basic ' + $rootScope.globals.currentUser.email; // jshint ignore:line
            }
        }]);
