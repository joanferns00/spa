    /*
     *  test
     */


    app.directive("simpleChart", function ($window, WeatherService) {
//    http://jsfiddle.net/ShBQw/
        return{
            restrict: "EA",
            template: "<svg></svg>",
            link: function (scope, elem, attrs) {


                //Variables
                var wd = scope[attrs.chartData];
//            var wd = scope[attrs.chartData];
                //width and height
                var width = 1500, height = 200;
                var margin = {top: 10, right: 10, bottom: 40, left: 40};
                var svg;
                var div = d3.select("body").append("div")
                        .attr("class", "tooltip")
                        .style("opacity", 0);
//            var d3 = $window.d3;
//            var rawSvg = elem.find('svg');
//            // Define the div for the tooltip
//            var div = d3.select("body").append("div")
//                    .attr("class", "tooltip")
//                    .style("opacity", 0);
//            var svg = d3.select(rawSvg[0])
//                    .attr("width", width)
//                    .attr("height", height)
//                    .append('g')
//                    .attr('transform', 'translate(' + margin.left + ', ' + margin.top + ')');
                var xScale, yScale, xAxisGen, yAxisGen, drawlinegraph;
                var zoom;
                var make_x_axis, make_y_axis;
                var dots;
                //end of variables

                function initChart() {
                    var d3 = $window.d3;
                    var rawSvg = elem.find('svg');
                    //X scale
                    xScale = d3.time.scale()
                            .domain([
                                d3.time.hour.offset(wd[0].date, -1),
//                    wd[0].date,
//                            d3.time.day.offset(wd[wd.length - 1].date, 1)
                                d3.time.hour.offset(wd[wd.length - 1].date, 6)
//                            wd[wd.length - 1].date
                            ])
                            .rangeRound([0, width - margin.left - margin.right])
                            ;
                    //Y scale
                    yScale = d3.scale.linear()
                            .domain([d3.min(wd, function (d) {
                                    return d.temp;
                                }), d3.max(wd, function (d) {
                                    return d.temp;
                                })])
                            .range([height - margin.top - margin.bottom, 0]);

                    drawlinegraph = d3.svg.line()
                            .x(function (d) {
                                return xScale(d.date);
                            })
                            .y(function (d) {
                                return yScale(d.temp);
                            })
                            .interpolate("cardinal");
                    function zoomed() {
                        //Call the x-axis
                        svg.select(".x.axis").call(xAxisGen);
                        svg.select(".y.axis").call(yAxisGen);
                        //Set the x-axis
                        svg.select(".x.grid")
                                .call(make_x_axis()
                                        .tickSize(-height, 0, 0)
                                        .tickFormat(""));
                        //Set the y-axis
                        svg.select(".y.grid")
                                .call(make_y_axis()
                                        .tickSize(-width, 0, 0)
                                        .tickFormat(""));
                        svg.select(".line")
                                .attr("class", "line")
                                .attr("d", drawlinegraph(wd));
//                    bars.attr("transform", "translate(" + d3.event.translate[0] + ",0)scale(" + d3.event.scale + ",1)");
                        dots.attr("transform", "translate(" + d3.event.translate[0] + ",0)scale(" + d3.event.scale + ",1)");
                    }
                    zoom = d3.behavior.zoom()
                            .x(xScale)
//            .scaleExtent([1, 10])
                            //    .y(y)
                            .on("zoom", zoomed);

                    svg = d3.select(rawSvg[0])
                            .attr("width", width)
                            .attr("height", height)
                            .append('g')
                            .attr('transform', 'translate(' + margin.left + ', ' + margin.top + ')')
                            .call(zoom);
                    //so that it catches all the events in the svg.
                    svg.append("svg:rect")
                            .attr("width", width)
                            .attr("height", height)
                            .attr("class", "plot");

                    make_x_axis = function () {
                        return d3.svg.axis()
                                .scale(xScale)
                                .orient("bottom")
                                .ticks(d3.time.hour, 3)
//                            .tickFormat(d3.time.format("%H:%M"))
                                .tickSize(-height + margin.top + margin.bottom, 0, 0)
                                .tickPadding(1)
                                ;
                    };

                    make_y_axis = function () {
                        return  d3.svg.axis()
                                .scale(yScale)
                                .orient("left")
                                .tickSize(-width + margin.left + margin.right, 0, 0)
                                .ticks(10)
                                ;
                    };

                    xAxisGen = d3.svg.axis()
                            .scale(xScale)
                            .orient("bottom")
                            .ticks(d3.time.hour, 3)
//                        .tickFormat(d3.time.format("%H:%M"))
                            .tickSize(-height + margin.top + margin.bottom, 0, 0)
                            .tickPadding(1)
                            ;
                    yAxisGen = d3.svg.axis()
                            .scale(yScale)
                            .orient("left")
                            .tickSize(-width + margin.left + margin.right, 0, 0)
                            .ticks(10)
                            ;

                    d3.select("#resetgraph").on("click", reset);
                    function reset() {
                        console.log("Going to reset");
                        svg.call(zoom.x(
                                xScale.domain([
                                    d3.time.hour.offset(wd[0].date, -1),
                                    d3.time.hour.offset(wd[wd.length - 1].date, 6)
                                ])
                                ).event);
                    }


                }

                function drawLineChart() {

                    svg.append("svg:g")
                            .attr("class", "x axis")
                            .attr('transform', 'translate(0, ' + (height - margin.top - margin.bottom) + ')')
                            .call(xAxisGen);
                    svg.append("svg:g")
                            .attr("class", "y axis")
                            .call(yAxisGen);

                    svg.append("svg:g")
                            .attr("class", "x grid")
                            .attr("transform", "translate(0," + height + ")")
                            .call(make_x_axis()
                                    .tickSize(-height + margin.top + margin.bottom, 0, 0)
                                    .tickFormat(""));

                    svg.append("text")      // text label for the x axis
                            .attr("x", width / 2)
                            .attr("y", height - margin.bottom + 10)
                            .text("Date");

                    svg.append("text")      // text label for the x axis
                            .attr("transform", "translate(-25," + height / 2 + ")rotate(-90)")
                            .text("Temperature (" + scope.tempformat + ")");


                    //Clip out the extra information show on either sides of the x-axis
                    var clip = svg.append("svg:clipPath")
                            .attr("id", "clip")
                            .append("svg:rect")
//                        .attr("x", 0)
//                        .attr("y", 0)
                            .attr("width", width - margin.left - margin.right)
                            .attr("height", height - margin.top - margin.bottom);

                    var chartBody = svg.append("svg:g")
                            .attr("clip-path", "url(#clip)");

                    chartBody.append("path")
                            .datum(wd)
                            .attr("class", "line")
                            .attr("d", drawlinegraph(wd));



                    dots = svg.selectAll(".chart").data(wd)
                            .enter()
                            .append("circle")
                            .attr("r", 4)
                            .attr("cx", function (dd) {
                                return xScale(dd.date);
                            })
                            .attr("cy", function (dd) {
                                return yScale(dd.temp);
                            })
                            .style("fill", "none")
                            .style("pointer-events", "all")
                            .attr("stroke", "black")
                            .on("mousemove", function () {
                            })
                            .on("mouseover", function (d) {

                                div.transition()
                                        .duration(200)
                                        .style("opacity", .9);
                                div.html(gdt(d.date) + "<br/>" + Math.round(d.temp) + scope.tempformat)
                                        .style("left", (d3.event.pageX) + "px")
                                        .style("top", (d3.event.pageY - 28) + "px");
                            })
                            .on("mouseout", function (d) {
                                div.transition()
                                        .duration(500)
                                        .style("opacity", 0);
                            });


                }

                //initialize the data
                WeatherService.get5dayData(scope.selectedcity).then(
                        function (data) {
                            for (var i = 0; i < data.list.length; i++) {
                                var t = data.list[i];
                                scope.lineData.push({date: gDate(t.dt), temp: (t.main.temp - 272.15)});
                            }
                            //draw the chart
                            initChart();
                            drawLineChart();
                        },
                        function (err) {
                            console.log("Sorry we encountered an error " + err);
                        }
                );


                scope.$watch('tempformat', function (nv, ov) {
                    if (scope.lineData !== undefined) {
                        if (nv && nv !== ov) {
                            console.log("Going to convert the temerature for graph " + nv);
//                    for (var i = 0; i < scope.lineData.length; i++) {
//                        if (nv === "C") {
//                            scope.lineData[i].temp = FtoC(scope.lineData[i].temp);
//                        }
//                        else if (nv === "F") {
//                            scope.lineData[i].temp = CtoF(scope.lineData[i].temp);
//                        }
//                    }


                            /**
                             * Working code
                             */
                            //call the weather data for the city.
                            WeatherService.get5dayData(nv).then(
                                    function (data) {
                                        scope.lineData = new Array();
                                        for (var i = 0; i < data.list.length; i++) {
                                            var t = data.list[i];
                                            if (nv === "C") {
                                                //KToC
                                                //Math.round(KToC(element.temp[key], "C"));
                                                scope.lineData.push({date: gDate(t.dt), temp: Math.round(KToC(t.main.temp, "C"))});
                                            }
                                            if (nv === "F") {
                                                scope.lineData.push({date: gDate(t.dt), temp: Math.round(KToC(t.main.temp, "F"))});
                                            }

                                            //  -457.87
                                        }
                                        wd = scope[attrs.chartData];
                                        emptyLineChart();
                                        initChart();
                                        drawLineChart();
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

                scope.$watch('selectedcity', function (nv, ov) {
                    if (scope.lineData !== undefined) {
                        if (nv && nv !== ov) {
                            //call the weather data for the city.
                            WeatherService.get5dayData(nv).then(
                                    function (data) {
                                        scope.lineData = new Array();
                                        for (var i = 0; i < data.list.length; i++) {
                                            var t = data.list[i];
                                            //(data.list[i].dt_txt).replace(/ /g, "T")
                                            scope.lineData.push({date: gDate(t.dt), temp: (t.main.temp - 272.15)});
                                            //  -457.87
                                        }
                                        wd = scope[attrs.chartData];
                                        emptyLineChart();
                                        initChart();
                                        drawLineChart();
                                    },
                                    function (err) {
                                        console.log("Sorry we encountered an error " + err);
                                    }
                            );
                        }
                    }
                });




                function emptyLineChart() {
                    d3.selectAll("svg > *").remove();
                }








            }
        };
    });