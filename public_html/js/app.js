    /*
     *  test
     */
    var app = angular.module("MainApp", ['ngRoute', 'myFilters', 'myDateFilter', 'myDTFilter', 'myDatedFilter', 'myDayFilter', 'myDirectionFilter']);
    app.config(function ($routeProvider, $locationProvider) {
        $routeProvider
                // route for the home page
                .when('/list', {
                    templateUrl: 'view/list.html',
                    controller: 'ListController'
                })
                .when('/index.html', {
                    templateUrl: 'js/view/list.html',
                    controller: 'ListController'
                })
                .when('/', {
                    templateUrl: 'js/view/list.html',
                    controller: 'ListController'
                })
                // route for the about page
                .when('/weather', {
                    templateUrl: 'js/view/weather.html',
                    controller: 'WeatherController'
                })

                // route for the contact page
                .when('/photos', {
                    templateUrl: 'js/view/photos.html',
                    controller: 'PhotoController'
                })
                .otherwise({
                    redirectTo: 'js/view/'});
        // use the HTML5 History API
        $locationProvider.html5Mode(true);
    }
    );