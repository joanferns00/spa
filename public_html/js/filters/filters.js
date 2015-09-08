    /*
     *  test
     */


    angular.module('myFilters', []).
            filter('customFilter', function () {
                return function (images, filter) {
                    var results = [];
//                console.log(filter);
                    if (!filter.category) {
                        return images;
                    }
                    angular.forEach(images, function (images) {
                        results.push(images);
                    });
                    return results;
                };
            });

    angular.module('myDirectionFilter', []).filter('mydirection', function () {
        return function (input) {
            return degToCompass(input);
        };
    });


//gDate(date).getDate();

    angular.module('myDatedFilter', []).filter('myddate', function () {
        return function (input) {
            return input ? gDate(input).getDate() : "";
        };
    });

    angular.module('myDayFilter', []).filter('myday', function () {
        return function (input) {
            return input ? dayofweek(gDate(input).getDay(), 1) : "";
        };
    });

    angular.module('myDateFilter', []).filter('mydate', function () {
        return function (input) {
            return input ? gd(input) + " " + dayofweek(gDate(input).getDay(), 1) : "";
        };
    });
    angular.module('myDTFilter', []).filter('mytime', function () {
        return function (input) {
            return input ? gt(input) : "";
        };
    });