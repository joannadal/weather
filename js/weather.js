angular.module("Weather", []).controller("WeatherController",
    function WeatherController($scope, $http) {
        $scope.APIkey = '1884739a657593032d171d174a7f40ef';

        $scope.latitude = '';
        $scope.longitude = '';

        //Weather variables
        $scope.unit = 'metric'
        $scope.degrees = null;
        $scope.city = '';
        $scope.country = '';
        $scope.weatherIconUrl = '';

        $scope.forecast = [];

        $scope.getData = function (url) {
            $http.get(url + '&units=' + $scope.unit + '&APPID=' + $scope.APIkey).
            success(function(data, status, headers, config) {
                //Actions when get the Weather data
                $scope.city = data.name;
                $scope.country = data.sys.country;
                $scope.degrees = data.main.temp;
                $scope.weatherIconUrl = $scope.getWeatherIconUrl(data.weather[0].icon);
            }).
            error(function(data, status, headers, config) {
                alert("There was an error getting the Weather data.");
            });
        };

        $scope.getDataForecast = function (url) {
            $http.get(url + '&units=' + $scope.unit + '&APPID=' + $scope.APIkey).
            success(function(data, status, headers, config) {
                $scope.forecast = data.list.slice(0, 6);;
            }).
            error(function(data, status, headers, config) {
                alert("There was an error getting the Weather forecast data.");
            });
        };

        $scope.setUnit = function (unit) {
            $scope.unit = unit;
        };

        $scope.getWeatherIconUrl = function (code) {
            if (code) {
                return 'http://openweathermap.org/img/w/' + code + '.png';
            }
            else {
                return '';
            }
        };

        $scope.setLocation = function (location) {
            $scope.latitude = location.coords.latitude;
            $scope.longitude = location.coords.longitude;
            url = 'http://api.openweathermap.org/data/2.5/weather?lat=' + String($scope.latitude) + '&lon=' + String($scope.longitude);
            $scope.getData(url);
        };

        $scope.getByLocation = function (latitude, longitude) {
            if (navigator.geolocation) {
                navigator.geolocation.getCurrentPosition($scope.setLocation);
            }
            else {
                alert("Geolocation is not supported by this browser.");
            }
        };

        $scope.getByCityID = function (cityID) {
            url = 'http://api.openweathermap.org/data/2.5/weather?id=' + String(cityID);
            urlForecast = 'http://api.openweathermap.org/data/2.5/forecast/daily?id=' + String(cityID);
            $scope.getData(url);
            $scope.getDataForecast(urlForecast);
        };
    }
);
