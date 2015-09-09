    /*
     *  test
     */


    app.directive('w7day', function (WeatherService) {
        return{
            restrict: 'E',
            templateUrl: "js/view/weather/SevenDayweather.html",
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
                            WeatherService.getData(nv, 7).then(
                                    function (data) {
                                        scope.info = data;
                                        scope.info.list.forEach(function (ele, idx, arr) {
                                            for (var key in ele.temp) {
                                                if (scope.tempUnit === "C") {
                                                    ele.temp[key] = Math.round(KToC(ele.temp[key], "C"));
                                                }
                                                else if (scope.tempUnit === "F") {
                                                    ele.temp[key] = Math.round(KToC(ele.temp[key], "F"));
                                                }
                                            }
                                        });

//                                        scope.info = data;
//                                        for (var key in data.main) {
//                                            if (key.indexOf("temp") !== -1) {
//                                                if (scope.tempUnit === "C") {
//                                                    data.main[key] = Math.round(KToC(data.main[key], "C"));
//                                                }
//                                                else if (scope.tempUnit === "F") {
//                                                    data.main[key] = Math.round(KToC(data.main[key], "F"));
//                                                }
//                                            }
//                                        }
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
                                scope.info.list.forEach(function (ele, idx, arr) {
                                    for (var key in ele.temp) {
                                        ele.temp[key] = Math.round(FtoC(ele.temp[key], "C"));
                                    }
                                });
                            }
                            else if (nv === "F") {
                                scope.tempUnit = "F";

                                //(K × 1.8) - 459.67
                                //for each element, change the value to F
                                scope.info.list.forEach(function (ele, idx, arr) {
                                    for (var key in ele.temp) {
                                        ele.temp[key] = Math.round(CtoF(ele.temp[key], "C"));
                                    }
                                });
                            }
                        }
                    }
                });
            }

        };
    });