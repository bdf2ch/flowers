"use strict";


var misc = angular.module("lotos.misc", [])
    .config(function ($provide) {
        $provide.factory("$misc", ["$log", "$http", function ($log, $http) {
            var module = {};

            module.paymentMethods = [];
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

            return module;
        }]);
    })
    .run(function ($log) {
        $log.log("misc module");
    }
);