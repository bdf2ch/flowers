"use strict";


var misc = angular.module("lotos.misc", [])
    .config(function ($provide) {
        $provide.factory("$misc", ["$log", "$http", function ($log, $http) {
            var module = {};

            module.paymentMethods = [];
            module.deliveryMethods = [];
            module.cities = [];
            module.genders = [
                {
                    id: 1,
                    title: "Уважаемый"
                },
                {
                    id: 2,
                    title: "Уважаемая"
                }
            ];

            module.getCityById = function (cityId) {
                if (cityId !== undefined) {
                    angular.forEach(module.cities, function (city, key) {
                        if (city.id.value === cityId) {
                            return city;
                        }
                    });
                }
            };

            return module;
        }]);
    })
    .run(function ($log) {
        $log.log("misc module");
    }
);