var bouquets = angular.module("lotos.bouquets", [])
    .config(function ($provide) {
        $provide.factory("$bouquets", ["$log", "$http", function ($log, $http) {
            var module = {};

            module.get = function () {
                $http.post("", params)
                    .success(function (data) {

                    }
                );
            };

            return module;
        }]);
    });
