    /*
     *  test
     */


    app.directive('weatherToday', function (WeatherService) {
        return {
            restrict: 'E',
            templateUrl: "js/view/weather/tw.html",
            scope: {info: '=',
                tempformat: '=',
                selectedcity: '='
            },
            link: function (scope, element, attr) {
                scope.tempUnit = "C";
                scope.$watch('selectedcity', function (nv, ov) {

                    if (scope.info !== undefined) {
                        if (nv && nv !== ov) {
                            //call the weather data for the city.
                            WeatherService.getTodaysData(nv).then(
                                    function (data) {
                                        scope.info = data;
                                        for (var key in data.main) {
                                            if (key.indexOf("temp") !== -1) {
                                                if (scope.tempUnit === "C") {
                                                    data.main[key] = Math.round(KToC(data.main[key], "C"));
                                                }
                                                else if (scope.tempUnit === "F") {
                                                    data.main[key] = Math.round(KToC(data.main[key], "F"));
                                                }
                                            }
                                        }
                                    },
                                    function (err) {
                                        console.log("Sorry we encountered an error " + err);
                                    }
                            );
                        }
                    }
                });
                scope.$watch('tempformat', function (nv, ov) {

                    if (scope.info !== undefined) {
                        if (nv && nv !== ov) {
                            if (nv === "C") {
                                //C-272.15
                                scope.tempUnit = "C";
                                for (var key in scope.info.main) {
                                    if (key.indexOf("temp") !== -1) {
                                        scope.info.main[key] = Math.round(FtoC(scope.info.main[key], "C"));
                                    }
                                }
                            }
                            else if (nv === "F") {
                                scope.tempUnit = "F";
                                //(K × 1.8) - 459.67
                                for (var key in scope.info.main) {
                                    if (key.indexOf("temp") !== -1) {
                                        scope.info.main[key] = Math.round(CtoF(scope.info.main[key], "C"));

                                    }
                                }
                            }
                        }
                    }
                });
            }
        };
    });