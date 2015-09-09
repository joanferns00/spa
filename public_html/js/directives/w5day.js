    /*
     *  test
     */


    app.directive('w5day', function (WeatherService) {
        return{
            restrict: 'E',
            templateUrl: "js/view/weather/FiveDayweather.html",
            scope: {info: '=',
                tempformat: '=',
                selectedcity: '='
            },
            link: function (scope, element, attr) {
                scope.tempUnit = "C";
                //If the selected city changes
                scope.$watch('selectedcity', function (nv, ov) {
                    if (scope.info !== undefined) {
                        if (nv && nv !== ov) {
                            //call the weather data for the city.
                            WeatherService.getData(nv, 5).then(
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
                //Change in temp format from C to F or viceversa
                scope.$watch('tempformat', function (nv, ov) {
                    if (scope.info !== undefined) {
                        if (nv && nv !== ov) {

                            if (nv === "C") {
                                //C-272.15
                                scope.tempUnit = "C";

                                //for each element, change the value to F
                                scope.info.list.forEach(function (ele, idx, arr) {
                                    for (var key in ele.temp) {
                                        ele.temp[key] = Math.round(FtoC(ele.temp[key], "C"));
                                    }
                                });
                            }
                            else if (nv === "F") {
                                //for each element, change the value to F
                                scope.info.list.forEach(function (ele, idx, arr) {
                                    for (var key in ele.temp) {
                                        ele.temp[key] = Math.round(CtoF(ele.temp[key], "C"));
                                    }
                                });
                                scope.tempUnit = "F";
                                //(K × 1.8) - 459.67
                            }
                        }
                    }
                });
            }

        };
    });