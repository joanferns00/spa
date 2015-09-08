    /*
     *  test
     */


    app.factory('WeatherService', function ($http) {
        return {
            //Right Now
            getTodaysData: function (city) {
                return $http.get('http://api.openweathermap.org/data/2.5/weather?q=' + city + ',US').then(function (result) {
                    return result.data;
                });
            },
            //5-days detailed hourly weather
            get5dayData: function (city) {
                return $http.get('http://api.openweathermap.org/data/2.5/forecast?q=' + city + ',us&mode=json').then(function (result) {
                    return result.data;
                });
            },
            //16-day days weather
            getData: function (city, days) {
                //since $http.get returns a promise,
                //and promise.then() also returns a promise
                //that resolves to whatever value is returned in it's
                //callback argument, we can return that.
                //
                //http://api.openweathermap.org/data/2.5/forecast?q=60607&mode=json
                return $http.get('http://api.openweathermap.org/data/2.5/forecast/daily?q=' + city + ',US&mode=json&cnt=' + days).then(function (result) {

                    return result.data;
                });
            }
        };
    });