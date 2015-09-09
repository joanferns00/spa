    /*
     *  The 5-day weather chart
     */
    app.directive("respChart", function ($window, WeatherService) {

        return{
            restrict: "EA",
            template: "<svg id='graph'></svg>",
            link: function (scope, elem, attrs) {
                //To empty the svg when the city or temp format has changed
                function emptyLineChart() {
                    d3.selectAll("svg#graph > *").remove();
                }
                var wd = scope[attrs.chartData];
                //initialize the data
                WeatherService.get5dayData(scope.selectedcity).then(
                        function (data) {
                            var dates = [];
                            scope.dataset = [];
                            var max = -200;
                            var min = 500;


                            //Get the 5 days
                            //Get the max and min temperature
                            data.list.forEach(function (d) {
                                if (dates.indexOf(gd(d.dt)) === -1) {
                                    dates.push(gd(d.dt));
                                }
                                if (KToC(d.main.temp, "C") > max)
                                    max = KToC(d.main.temp, "C");

                                if (KToC(d.main.temp, "C") < min)
                                    min = KToC(d.main.temp, "C");
                            });

                            for (var i = 0; i < dates.length - 1; ++i) {
                                scope.dataset[i] = new Array();
                                data.list.forEach(function (d) {
                                    if (dates[i] === gd(d.dt)) {
                                        scope.dataset[i].push({x: gDate2(d.dt), y: KToC(d.main.temp, "C")});
                                    }
                                });
                            }
                            //draw the chart
                            var chart = lineChart("graph")
                                    .x(d3.time.scale().domain([
                                        scope.dataset[scope.dataset.length - 1][0].x, scope.dataset[scope.dataset.length - 1][7].x
                                                //        dataset[4][0].x, dataset[4][7].x
                                    ]))
                                    .y(d3.scale.linear().domain([min, max]));
                            scope.dataset.forEach(function (series) {
                                chart.addSeries(series);
                            });
                            //render the chart
                            chart.render();
                            //Add event for window resize to make the chart responsive
                            d3.select(window).on('resize', resize);
                            function resize() {
                                var width = parseInt(d3.select("#graph").style("width")),
                                        height = parseInt(d3.select("#graph").style("height"));
                                chart.width(width).height(height).render();
                            }
                        },
                        function (err) {
                            console.log("Sorry we encountered an error " + err);
                        }
                );


                //Redraw graph each time the city is changed
                scope.$watch('selectedcity', function (nv, ov) {
                    if (scope.lineData !== undefined) {
                        if (nv && nv !== ov) {
                            //call the weather data for the city.
                            WeatherService.get5dayData(nv).then(
                                    function (data) {
                                        var dates = [];
                                        scope.dataset = [];


                                        var max = -200;
                                        var min = 500;
                                        //Get the 5 days
                                        //Get the max and min temperature
                                        data.list.forEach(function (d) {
                                            if (dates.indexOf(gd(d.dt)) === -1) {
                                                dates.push(gd(d.dt));
                                            }


                                            if (scope.tempformat === "C") {

                                                if (KToC(d.main.temp, "C") > max)
                                                    max = KToC(d.main.temp, "C");

                                                if (KToC(d.main.temp, "C") < min)
                                                    min = KToC(d.main.temp, "C");

                                            }
                                            if (scope.tempformat === "F") {
                                                if (KToC(d.main.temp, "F") > max)
                                                    max = KToC(d.main.temp, "F");

                                                if (KToC(d.main.temp, "F") < min)
                                                    min = KToC(d.main.temp, "F");
                                            }


                                        });

                                        for (var i = 0; i < dates.length - 1; ++i) {
                                            scope.dataset[i] = new Array();
                                            data.list.forEach(function (d) {
                                                if (dates[i] === gd(d.dt)) {
                                                    if (scope.tempformat === "C") {
                                                        scope.dataset[i].push({x: gDate2(d.dt), y: KToC(d.main.temp, "C")});
                                                    }
                                                    if (scope.tempformat === "F") {
                                                        scope.dataset[i].push({x: gDate2(d.dt), y: KToC(d.main.temp, "F")});
                                                    }
                                                }
                                            });
                                        }

                                        wd = scope[attrs.chartData];
                                        emptyLineChart();

                                        //draw the chart
                                        var chart = lineChart("graph")
                                                .x(d3.time.scale().domain([
                                                    scope.dataset[scope.dataset.length - 1][0].x, scope.dataset[scope.dataset.length - 1][7].x
                                                ]))
                                                .y(d3.scale.linear().domain([min, max]));
                                        scope.dataset.forEach(function (series) {
                                            chart.addSeries(series);
                                        });
                                        //render the chart
                                        chart.render();
                                        //Add event for window resize to make the chart responsive
                                        d3.select(window).on('resize', resize);
                                        function resize() {
                                            var width = parseInt(d3.select("#graph").style("width")),
                                                    height = parseInt(d3.select("#graph").style("height"));
                                            chart.width(width).height(height).render();
                                        }
                                    },
                                    function (err) {
                                        console.log("Sorry we encountered an error " + err);
                                    }
                            );
                        }
                    }
                });


//Each time the temperature format is change from C to F ro vice-versa
                scope.$watch('tempformat', function (nv, ov) {
                    if (scope.lineData !== undefined) {
                        if (nv && nv !== ov) {

                            /**
                             * Working code
                             */
                            //call the weather data for the city.
                            WeatherService.get5dayData(nv).then(
                                    function (data) {
                                        var dates = [];
                                        scope.dataset = [];
                                        var max = -200;
                                        var min = 500;

                                        //Get the 5 days
                                        //Get the max and min temperature
                                        data.list.forEach(function (d) {
                                            if (dates.indexOf(gd(d.dt)) === -1) {
                                                dates.push(gd(d.dt));
                                            }

                                            if (nv === "C") {
                                                if (KToC(d.main.temp, "C") > max)
                                                    max = KToC(d.main.temp, "C");

                                                if (KToC(d.main.temp, "C") < min)
                                                    min = KToC(d.main.temp, "C");
                                            }
                                            if (nv === "F") {
                                                if (KToC(d.main.temp, "F") > max)
                                                    max = KToC(d.main.temp, "F");

                                                if (KToC(d.main.temp, "F") < min)
                                                    min = KToC(d.main.temp, "F");
                                            }


                                        });


                                        for (var i = 0; i < dates.length - 1; ++i) {
                                            scope.dataset[i] = new Array();
                                            data.list.forEach(function (d) {
                                                if (dates[i] === gd(d.dt)) {
                                                    if (nv === "C") {
                                                        scope.dataset[i].push({x: gDate2(d.dt), y: KToC(d.main.temp, "C")});
                                                    }
                                                    if (nv === "F") {
                                                        scope.dataset[i].push({x: gDate2(d.dt), y: KToC(d.main.temp, "F")});
                                                    }
                                                }
                                            });
                                        }

                                        wd = scope[attrs.chartData];
                                        emptyLineChart();
                                        //draw the chart
                                        var chart = lineChart("graph")
                                                .x(d3.time.scale().domain([
                                                    scope.dataset[scope.dataset.length - 1][0].x, scope.dataset[scope.dataset.length - 1][7].x
                                                ]))
                                                .y(d3.scale.linear().domain([min, max]));
                                        scope.dataset.forEach(function (series) {
                                            chart.addSeries(series);
                                        });
                                        //render the chart
                                        chart.render();
                                        //Add event for window resize to make the chart responsive
                                        d3.select(window).on('resize', resize);
                                        function resize() {
                                            var width = parseInt(d3.select("#graph").style("width")),
                                                    height = parseInt(d3.select("#graph").style("height"));
                                            chart.width(width).height(height).render();
                                        }


                                    },
                                    function (err) {
                                        console.log("Sorry we encountered an error " + err);
                                    }
                            );

                            /**
                             * Working code
                             */
                        }


                    }
                });


            }
        };
    });