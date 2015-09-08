    /*
     *  test
     */


    app.directive('weatherSix', function (WeatherService) {
        return {
            restrict: 'E',
            templateUrl: "js/view/weather/sw.html",
            scope: {info: '=',
                tempformat: '=',
                selectedcity: '='},
            link: function (scope, element, attrs, controller) {
                scope.tempUnit = "C";
                scope.$watch('selectedcity', function (nv, ov) {
                    if (scope.info !== undefined) {
                        if (nv && nv !== ov) {
                            //call the weather data for the city.
                            WeatherService.getData(nv, 16).then(
                                    function (data) {

                                        scope.info = data;
                                        //initialize data
                                        //Convert temp to Farenheit
                                        data.list.forEach(function (element, index, array) {
                                            for (var key in element.temp) {
                                                if (scope.tempUnit === "C") {
                                                    element.temp[key] = Math.round(KToC(element.temp[key], "C"));
                                                }
                                                else if (scope.tempUnit === "F") {
                                                    element.temp[key] = Math.round(KToC(element.temp[key], "F"));
                                                }
                                            }
                                        });
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
                                //Convert temp to C
                                scope.info.list.forEach(function (element, index, array) {
                                    for (var key in element.temp) {
                                        element.temp[key] = Math.round(FtoC(element.temp[key]));
                                    }
                                });
                            }
                            else if (nv === "F") {
                                scope.tempUnit = "F";
                                //(K × 1.8) - 459.67
                                //Convert temp to Farenheit
                                scope.info.list.forEach(function (element, index, array) {
                                    for (var key in element.temp) {
                                        element.temp[key] = Math.round(CtoF(element.temp[key]));
                                    }
                                });
                            }
                        }

                    }
                });
                //Initialize the directive after the ajax call is made.
                scope.$watch('info', function (nv, ov) {
                    if (scope.info !== undefined) {
                        if (nv && nv !== ov) {
                            scope.currentIndex = 0;
                            scope.showFwd();
                        }

                    }
                });
                var arrlength = 16;
                var incSize = 4;
                scope.currentIndex = 0;
                var no = Math.ceil(arrlength / incSize);
                scope.hideAll = function () {
                    scope.info.list.forEach(function (i) {
                        i.visible = false;
                    });
                };
                scope.showFwd = function () {
                    if (scope.currentIndex < no) {
                        scope.hideAll();
                        scope.currentIndex++;
                        for (var i = (no * (scope.currentIndex - 1)); i <= (((no * scope.currentIndex) - 1) > (arrlength - 1) ? arrlength - 1 : (no * scope.currentIndex) - 1); i++) {
//                        console.log("F Going to show " + i);
                            scope.info.list[i].visible = true;
                        }
                    }
                };
                scope.showBkd = function () {
                    if (scope.currentIndex > 1) {
                        scope.hideAll();
                        scope.currentIndex--;
                        for (var i = (((no * (scope.currentIndex - 1)) < 0) ? 0 : no * (scope.currentIndex - 1)); i <= (scope.currentIndex * no) - 1; i++) {
//                        console.log("B Going to show " + i);
                            scope.info.list[i].visible = true;
                        }
                    }
                };
            }
        };
    });