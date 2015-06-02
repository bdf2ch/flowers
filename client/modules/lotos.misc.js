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
            module.hours = [
                "00", "01", "02", "03", "04", "05", "06", "07",
                "08", "09", "10", "11", "12", "13", "14", "15",
                "16", "17", "18", "19", "20", "21", "22", "23"
            ];
            module.minutes = [
                "00", "30"
            ];

            module.getCityById = function (cityId) {
                if (cityId !== undefined) {
                    var answer = undefined;
                    angular.forEach(module.cities, function (city) {
                        if (city.id.value === cityId) {
                            answer =  city;
                        }
                    });
                    return answer;
                }
            };

            module.getDeliveryById = function (deliveryId) {
                if (deliveryId !== undefined) {
                    var answer = undefined;
                    angular.forEach(module.deliveryMethods, function (method) {
                        if (method.id.value === deliveryId) {
                            answer = method;
                        }
                    });
                    return answer;
                }
            };

            module.getPaymentMethodById = function (methodId) {
                if (methodId !== undefined) {
                    var answer = undefined;
                    angular.forEach(module.paymentMethods, function (method) {
                        if (method.id.value === methodId)
                            answer = method;
                    });
                    return answer;
                }
            };

            return module;
        }]);
    })
    .run(function ($log) {
        $log.log("misc module");
    }
);