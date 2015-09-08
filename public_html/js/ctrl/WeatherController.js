    /*
     *  test
     */


    app.controller("WeatherController", function ($scope, WeatherService) {
        $scope.lineData = new Array();
        $scope.weatherData = new Array();
        // create a message to display in our view
        $scope.title = 'Weather';
        $scope.message = 'City';
        $scope.selectedcity = "Chicago";
//    $scope.weather16 = null;
        $scope.cities = {
            "Chicago": "Chicago, IL",
            "New York": "New York City, NY",
            "San Francisco": "San Francisco, CA",
            "Denver": "Denver, CO",
            "Honolulu": "Honolulu, Hawai",
            "Juneau": "Juneau, Alaska"
        };
        $scope.tempformat = "C";
        $scope.$watch('tempformat', function (nv) {
            if ($scope.tempformat === "C") {
                //C-272.15
            }
            else if ($scope.tempformat === "F") {
                //(K × 1.8) - 459.67
            }
        });
//Get the weather from the WeatherService for 5 days
        WeatherService.getData($scope.selectedcity, 5).then(
                function (data) {
                    //initialize data
                    //Convert temp to Farenheit
                    data.list.forEach(function (element, index, array) {
                        for (var key in element.temp) {
                            element.temp[key] = Math.round(KToC(element.temp[key], "C"));
                        }
                    });
                    $scope.weather5 = data;

                },
                function (err) {
                    console.log("Sorry we encountered an error " + err);
                }
        );

//Get the weather from the WeatherService for 7 days
        WeatherService.getData($scope.selectedcity, 7).then(
                function (data) {
                    //initialize data
                    //Convert temp to Farenheit
                    data.list.forEach(function (element, index, array) {
                        for (var key in element.temp) {
                            element.temp[key] = Math.round(KToC(element.temp[key], "C"));
                        }
                    });
                    $scope.weather7 = data;

                },
                function (err) {
                    console.log("Sorry we encountered an error " + err);
                }
        );

//Get the weather from the WeatherService for 16 days
        WeatherService.getData($scope.selectedcity, 16).then(
                function (data) {
                    //initialize data
                    //Convert temp to Farenheit
                    data.list.forEach(function (element, index, array) {
                        for (var key in element.temp) {
                            element.temp[key] = Math.round(KToC(element.temp[key], "C"));
                        }
                    });
                    $scope.weather16 = data;

                },
                function (err) {
                    console.log("Sorry we encountered an error " + err);
                }
        );
        WeatherService.getTodaysData($scope.selectedcity).then(
                function (data) {
                    $scope.weather = data;
                    for (var key in data.main) {
                        if (key.indexOf("temp") !== -1) {
                            data.main[key] = Math.round(KToC(data.main[key], "C"));
                        }
                    }
                },
                function (err) {
                    console.log("Sorry we encountered an error " + err);
                }
        );
    });