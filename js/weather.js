angular.module("Weather", []).controller("WeatherController",
    function WeatherController($scope, $http) {
        $scope.APIkey = '2d94e0fd44b2ab607ff950cd8d6a89b8';

        $scope.latitude = '';
        $scope.longitude = '';

        //Weather variables
        $scope.unit = 'metric'
        $scope.degrees = null;
        $scope.city = '';
        $scope.weatherIconUrl = '';

        $scope.getData = function (url) {
            $http.get(url + '&units=' + $scope.unit + '&APPID=' + $scope.APIkey).
            success(function(data, status, headers, config) {
                //Actions when get the Weather data
                $scope.city = data.name;
                $scope.degrees = data.main.temp;
                $scope.setWeatherIconUrl(data.weather[0].icon);
            }).
            error(function(data, status, headers, config) {
                alert("There was an error getting the Weather data.");
            });
        };

        $scope.setUnit = function (unit) {
            $scope.unit = unit;
        }

        $scope.setWeatherIconUrl = function (code) {
            if (code) {
                $scope.weatherIconUrl = 'http://openweathermap.org/img/w/' + code + '.png';
            }
        }

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
            $scope.getData(url);
        }
    }
);
