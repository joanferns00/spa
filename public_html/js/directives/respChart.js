    /*
     *  test
     */


    app.directive("respChart", function ($window) {

        return{
            restrict: "EA",
            template: "<svg></svg>",
            link: function (scope, elem, attrs) {

                var data = [
                    {
                        date: new Date('December 1, 2015 00:00:00'),
                        temp: 45
                    },
                    {
                        date: new Date('December 1, 2015 06:00:00'),
                        temp: 35
                    },
                    {
                        date: new Date('December 1, 2015 12:00:00'),
                        temp: 45
                    },
                    {
                        date: new Date('December 1, 2015 18:00:00'),
                        temp: 55
                    },
                    {
                        date: new Date('December 2, 2015 00:00:00'),
                        temp: 45
                    },
                    {
                        date: new Date('December 2, 2015 06:00:00'),
                        temp: 35
                    },
                    {
                        date: new Date('December 2, 2015 12:00:00'),
                        temp: 45
                    },
                    {
                        date: new Date('December 2, 2015 18:00:00'),
                        temp: 55
                    },
                    {
                        date: new Date('December 3, 2015 00:00:00'),
                        temp: 45
                    },
                    {
                        date: new Date('December 3, 2015 06:00:00'),
                        temp: 35
                    },
                    {
                        date: new Date('December 3, 2015 12:00:00'),
                        temp: 45
                    },
                    {
                        date: new Date('December 3, 2015 18:00:00'),
                        temp: 55
                    }

                ];

//                var width = 1000, height = 500;
                var width = 900, height = 200;
                var margin = {top: 10, right: 10, bottom: 40, left: 40};
                var svg;
                var d3 = $window.d3;
                var rawSvg = elem.find('svg');
                var xScale, yScale, xAxisGen, yAxisGen, drawlinegraph;
                var zoom;
                var make_x_axis, make_y_axis;
                var dots;


                var d3 = $window.d3;
                var rawSvg = elem.find('svg');


                //X scale
                xScale = d3.time.scale()
                        .domain([
                            d3.time.hour.offset(data[0].date.getHours(), -1),
                            d3.time.hour.offset(data[data.length - 1].date.getHours(), 6)
                        ])
                        .rangeRound([0, width - margin.left - margin.right]);
                //Y scale
                yScale = d3.scale.linear()
                        .domain([d3.min(data, function (d) {
                                return d.temp;
                            }), d3.max(data, function (d) {
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

                svg = d3.select(rawSvg[0])
                        .attr("preserveAspectRatio", "xMidYMid meet")
                        .attr("viewBox", "0 0 " + width + " " + height + " ")
                        .append('g')
                        .attr('transform', 'translate(' + margin.left + ', ' + margin.top + ')');

                make_x_axis = function () {
                    return d3.svg.axis()
                            .scale(xScale)
                            .orient("bottom")
                            .ticks(d3.time.hour, 3)
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

                        .tickSize(-height + margin.top + margin.bottom, 0, 0)
                        .tickPadding(1)
                        ;
                yAxisGen = d3.svg.axis()
                        .scale(yScale)
                        .orient("left")
                        .tickSize(-width + margin.left + margin.right, 0, 0)
                        .ticks(10)
                        ;

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



            }
        }
        ;
    });